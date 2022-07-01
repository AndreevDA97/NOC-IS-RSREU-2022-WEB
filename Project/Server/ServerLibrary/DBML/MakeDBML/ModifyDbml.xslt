<xsl:stylesheet version="1.0"
	xmlns:dbml="http://schemas.microsoft.com/linqtosql/dbml/2007"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	exclude-result-prefixes="dbml">
  <xsl:output method="xml" indent="yes"/>
  <xsl:template match="@* | node()">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()"/>
    </xsl:copy>
  </xsl:template>
  <xsl:template match="//dbml:Type[@Name = 'GisGkhPackets']/dbml:Column[@Name = 'RequestXmlCompressed']">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()" />
      <xsl:attribute name="IsDelayLoaded">true</xsl:attribute>
    </xsl:copy>
  </xsl:template>
  <xsl:template match="//dbml:Type[@Name = 'GisGkhPackets']/dbml:Column[@Name = 'ResponseXmlCompressed']">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()" />
      <xsl:attribute name="IsDelayLoaded">true</xsl:attribute>
    </xsl:copy>
  </xsl:template>
  <xsl:template match="//dbml:Type[@Name = 'ContractServiceTypes']/dbml:Association[@Name = 'FR_ContractServiceTypeTransitions_FromServiceTypeID']">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()" />
      <xsl:attribute name="Member">FromServiceTypeTransitions</xsl:attribute>
    </xsl:copy>
  </xsl:template>
  <xsl:template match="//dbml:Type[@Name = 'ContractServiceTypes']/dbml:Association[@Name = 'FR_ContractServiceTypeTransitions_ToServiceTypeID']">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()" />
      <xsl:attribute name="Member">ToServiceTypeTransitions</xsl:attribute>
    </xsl:copy>
  </xsl:template>
  <xsl:template match="//dbml:Type[@Name = 'ContractServiceTypeTransitions']/dbml:Association[@Name = 'FR_ContractServiceTypeTransitions_FromServiceTypeID']">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()" />
      <xsl:attribute name="Member">FromServiceType</xsl:attribute>
    </xsl:copy>
  </xsl:template>
  <xsl:template match="//dbml:Type[@Name = 'ContractServiceTypeTransitions']/dbml:Association[@Name = 'FR_ContractServiceTypeTransitions_ToServiceTypeID']">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()" />
      <xsl:attribute name="Member">ToServiceType</xsl:attribute>
    </xsl:copy>
  </xsl:template>
  <xsl:template match="//dbml:Type[@Name = 'LawCases']/dbml:Association[@Name = 'FK_LawCases_LawPrevStages']">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()" />
      <xsl:attribute name="Member">LawPrevStages</xsl:attribute>
    </xsl:copy>
  </xsl:template>
  <xsl:template match="//dbml:Type[@Name = 'LawCases']/dbml:Association[@Name = 'FK_LawCases_LawStages']">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()" />
      <xsl:attribute name="Member">LawStages</xsl:attribute>
    </xsl:copy>
  </xsl:template>
</xsl:stylesheet>