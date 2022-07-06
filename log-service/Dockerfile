FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
RUN mkdir -p /var/www/log-service/build
WORKDIR /var/www/log-service/build

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet build -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /var/www/log-service/run
COPY --from=build /var/www/log-service/build/out .
RUN ls
ENTRYPOINT ["dotnet", "log-service.dll"]