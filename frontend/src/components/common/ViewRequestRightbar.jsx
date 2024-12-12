import { toast } from 'react-toastify'
import SearchIcon from '../../assets/svg/SearchIcon'
import { useState } from 'react'
import UpwardArrow from '../../assets/svg/UpwardArrow'
import DateIcon from '../../assets/svg/DateIcon'
import html2PDF from 'html2pdf.js'

const ViewRequestRightbar = ({
  setSearchCommon,
  setSearchSI,
  setSearchName,
  setSearchCost
}) => {
  const [isShowButton, setIsShowButton] = useState(false)
  const phtoken = localStorage.getItem('phtoken')

  const handlePDFDownload = async () => {
    toast.success('Downloading started ')
    const pages = document.getElementById('requestTable')
    html2PDF(pages, {
      jsPDF: {
        format: 'a4',
      },
      imageType: 'image/png',
      output: 'pdf/output.pdf',
    })
  }

  function handleCSVDownload() {
    toast.success('CSV Download Started')
    var table_id = 'requestTable'
    var separator = ','
    var rows = document.querySelectorAll('table#' + table_id + ' tr')
    var csv = []
    for (var i = 0; i < rows.length; i++) {
      var row = [],
        cols = rows[i].querySelectorAll('td, th')
      for (var j = 0; j < cols.length; j++) {
        var data = cols[j].innerText
          .replace(/(\r\n|\n|\r)/gm, '')
          .replace(/(\s\s)/gm, ' ')
        data = data.replace(/"/g, `""`)
        row.push(`"` + data + `"`)
      }
      csv.push(row.join(separator))
    }
    var csv_string = csv.join('\n')
    var filename =
      'export_' + table_id + '_' + new Date().toLocaleDateString() + '.csv'
    var link = document.createElement('a')
    link.style.display = 'none'
    link.setAttribute('target', '_blank')
    link.setAttribute(
      'href',
      'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string),
    )
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="dashboard-rightbar">
      <div className="dashboard-rightbar-box">
        <div className="dashboard-rightbar-box-text-right">Filters</div>
        <div className="dashboard-rightbar-search-all-container">
          <div>
            <SearchIcon />
          </div>
          <div>
            <input
              type="search"
              className="dashboard-rightbar-search-container-input pointer"
              placeholder="Search"
              onChange={(e) => setSearchCommon(e.target.value)}
            />
          </div>
        </div>
        <div className="dashboard-rightbar-search-2">
          <div className="dashboard-rightbar-search-all-container">
            <div>
              <SearchIcon />
            </div>
            <div>
              <input
                type="search"
                className="dashboard-rightbar-search-container-input pointer"
                placeholder="Search By SI"
                onChange={(e) => setSearchSI(e.target.value)}
              />
            </div>
          </div>
          <div className="dashboard-rightbar-search-all-container">
            <div>
              <SearchIcon />
            </div>
            <div>
              <input
                type="search"
                className="dashboard-rightbar-search-container-input pointer"
                placeholder="Search By Report"
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="dashboard-rightbar-search-2">
          <div className="dashboard-rightbar-search-all-container">
            <div>
              <SearchIcon />
            </div>
            <div>
              <input
                type="search"
                className="dashboard-rightbar-search-container-input pointer"
                placeholder="Search By Cost"
                onChange={(e) => setSearchCost(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="dashboard-rightbar-box-text-right">Export</div>
        <button
          className="dashboard-rightbar-export-button pointer"
          onClick={handlePDFDownload}
        >
          DOWNLOAD AS PDF
        </button>
        <button
          className="dashboard-rightbar-CSV-button pointer"
          onClick={handleCSVDownload}
        >
          DOWNLOAD AS CSV
        </button>
      </div>
    </div>
  )
}

export default ViewRequestRightbar
