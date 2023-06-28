// const csvUrl = 'https://gist.githubusercontent.com/simonlast/d5a86ba0c82e1b0d9f6e3d2581b95755/raw/f608b9b896dd3339df13dae317998d5f24c00a50/edu-scorecard.csv';
type TableRow = string[];

function parseCSV(csvData: string): TableRow[] {
  const rows = csvData.split('\n');
  const parsedRows: TableRow[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i].split(',');
    parsedRows.push(row);
  }

  return parsedRows;
}

function stripWebsiteLink(website: string): string {
  let strippedLink = website.replace(/(https?:\/\/)?(www\.)?/i, '');
  return strippedLink;
}

function createCardData(rows: TableRow[]): void {
  const dataContainer = document.getElementById('data-container');

  let currentRow: HTMLDivElement | null = null;

  rows.forEach((row, rowIndex) => {
    const location = `${row[2]} <span class="bullet">•</span> ${row[3]}`;
    const schoolName = row[1];
    const website = stripWebsiteLink(row[4]);

    if (rowIndex % 4 === 0) {
      currentRow = document.createElement('div');
      currentRow.classList.add('card-row');
      dataContainer.appendChild(currentRow);
    }

    const card = document.createElement('div');
    card.classList.add('card', `card-${rowIndex}`);

    const locationElement = document.createElement('div');
    locationElement.classList.add('card-location');
    locationElement.innerHTML = location;

    const schoolNameElement = document.createElement('h5');
    schoolNameElement.classList.add('card-title');
    schoolNameElement.textContent = schoolName;

    const websiteElement = document.createElement('a');
    websiteElement.classList.add('card-link');
    websiteElement.href = 'http://' + website;
    websiteElement.target = '_blank';
    websiteElement.textContent = website;

    card.appendChild(locationElement);
    card.appendChild(schoolNameElement);
    card.appendChild(websiteElement);

    currentRow?.appendChild(card);
  });
}

function filterData(searchTerm: string): void {
  const cards = document.querySelectorAll('.card');

  cards.forEach((card) => {
    const schoolName = card.querySelector('.card-title').textContent;

    if (schoolName != null && schoolName.toLowerCase().includes(searchTerm.toLowerCase())) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
    const csvUrl = 'https://gist.githubusercontent.com/simonlast/d5a86ba0c82e1b0d9f6e3d2581b95755/raw/f608b9b896dd3339df13dae317998d5f24c00a50/edu-scorecard.csv';

    fetch(csvUrl)
        .then(response => response.text())
        .then(csvData => {
            const rows = parseCSV(csvData);
            createCardData(rows);
        })
        .catch(error => {
            console.error('Error:', error);
    });

    const searchInput = document.getElementById('search-input');
    if(searchInput != null) {
      searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim();
            filterData(searchTerm);
        });
    }

    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navigation = document.querySelector('.navigation');
    if(hamburgerBtn != null && navigation != null) {
      hamburgerBtn.addEventListener('click', function() {
        navigation.classList.toggle('show');
      });
    }

    const header = document.querySelector('.header');
    // Function to add or remove the "scrolled" class based on scroll position
    function handleScroll() {
      if (window.pageYOffset > 0) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll);
});
