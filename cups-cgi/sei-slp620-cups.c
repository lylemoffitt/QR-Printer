#include <stdio.h>
#include <cups/cups.h>

int main(void)
{
    char name[] = "sii-slp620";
    char uri[] = "ipp://localhost:631/printers/sii-slp620";
    cups_dest_t *dest = cupsGetDestWithURI(name, uri);
    if (dest == NULL)
        printf("Failed to get destination for %s with %s.\n", name, uri);

    char resource[256];
    http_t *http = cupsConnectDest(dest, CUPS_DEST_FLAGS_DEVICE,
                                   30000, NULL, resource,
                                   sizeof(resource), NULL, NULL);

    if (http == NULL)
        printf("HTTP connection failed: %s\n", cupsLastErrorString());

    cups_dinfo_t *info = cupsCopyDestInfo(http, dest);

    // Units are hundredths of millimeters
    cups_size_t media_size = {"Custom.54x101mm", 10100, 5400, 0, 0, 0, 0};

    int job_id = 0;
    int num_options = 0;
    cups_option_t *options = NULL;
    num_options = cupsAddOption(CUPS_MEDIA, "Custom.54x101mm",
                                num_options, &options);

    num_options = cupsAddOption(CUPS_PRINT_QUALITY, CUPS_PRINT_QUALITY_HIGH,
                                num_options, &options);

    num_options = cupsAddOption(CUPS_ORIENTATION, CUPS_ORIENTATION_LANDSCAPE,
                                num_options, &options);


    if (cupsCreateDestJob(http, dest, info,
                          &job_id, "Label", num_options,
                          options) == IPP_STATUS_OK)
        printf("Created job: %d\n", job_id);
    else
        printf("Unable to create job: %s\n",
               cupsLastErrorString());

    FILE *fp = fopen("/home/patrick/Desktop/test4.jpeg", "rb");
    size_t bytes;
    char buffer[65536];

    if (cupsStartDestDocument(CUPS_HTTP_DEFAULT, dest, info,
                              job_id, "/home/patrick/Desktop/test4.jpeg",
                              "image/jpeg", num_options, options, 1) == HTTP_STATUS_CONTINUE)
    {
      while ((bytes = fread(buffer, 1, sizeof(buffer), fp)) > 0)
          if (cupsWriteRequestData(CUPS_HTTP_DEFAULT, buffer,
              bytes) != HTTP_STATUS_CONTINUE)
          break;

          if (cupsFinishDestDocument(CUPS_HTTP_DEFAULT, dest,
                                     info) == IPP_STATUS_OK)
              puts("Document send succeeded.");
          else
              printf("Document send failed: %s\n",
              cupsLastErrorString());
    }

    fclose(fp);
    cupsFreeDestInfo(info);
    return (0);
}
