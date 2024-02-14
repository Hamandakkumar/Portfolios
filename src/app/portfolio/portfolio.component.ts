import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Carousel } from 'primeng/carousel';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  activeLink: string = '';
  isHovered: string = '';
  isClicked: boolean = false;
  @ViewChild("viewResumePopup") viewResumePopup: TemplateRef<any> | undefined;
  @ViewChild("snackbarTemplate", { static: true })
  snackbarTemplate: TemplateRef<any> | undefined;
  modalRef: BsModalRef | undefined;
  pdfViewerModuleLoaded: boolean = false;
  pdfSrc: string = '';
  phoneNumber: number = 0;
  mailId: string = '';
  location: string = '';
  popupMessage: string = '';
  closeIcon: string = '';
  mobileWidth = 767;
  showMenu: boolean = false;
  menuIconSrc: string = '../../assets/PortfolioAssets/menu-icon.png';
  menuBarIconSrc: string = '../../assets/PortfolioAssets/menu-icon.png';
  closeIconSrc: string = '../../assets/PortfolioAssets/close-icon.png';
  presentMonths: number = 0;
  carouselItems = [
    { title: 'Single Page Appication', img: '../../assets/PortfolioAssets/spa-icon-green.png', textContent:'SPAs — dynamic and responsive. From sleek portfolios to dynamic e-commerce and real-time collaboration, SPAs redefine engagement. Experience efficiency, speed, and user-centric design like task management, weather apps, and expense tracker.' },
    { title: 'Static Development', img: '../../assets/PortfolioAssets/static-icon-green.png', textContent:'Discover the elegance and efficiency of static web development—crafting captivating portfolios, informative recipe books, and polished product landing pages. Experience the versatility with dynamic event pages and precision countdown timers.' },
    { title: 'Dynamic Development', img: '../../assets/PortfolioAssets/dynamic-icon-green.png', textContent: 'Enter the dynamic world of web development, harmonizing interactivity with robust functionality. Develop real-time solutions, including e-learning platform, booking & reservation system, online blogging, job board, news portal, music streaming and recipe book.' },
    { title: 'E-Commerce Platform', img: '../../assets/PortfolioAssets/buy-icon-green.png', textContent:'Proficient in crafting ecommerce websites, I bring expertise in user-centric design, seamless navigation, and secure transactions. My skillset ensures a premium online shopping experience, integrating functionality with an aesthetically pleasing interface.' }
  ];

  @ViewChild('homeSection') homeSection!: ElementRef;
  @ViewChild('introSection') introSection!: ElementRef;
  @ViewChild('expertiseSection') expertiseSection!: ElementRef;
  @ViewChild('journeySection') journeySection!: ElementRef;
  @ViewChild('servicesSection') servicesSection!: ElementRef;
  @ViewChild('contactSection') contactSection!: ElementRef;
  
  constructor(private modalService: BsModalService, private clipboard: Clipboard,private snackBar: MatSnackBar) {
    this.pdfSrc = '../../assets/PortfolioAssets/Hamandakkumar_Resume.pdf';
  }
  
  ngAfterViewInit() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.7,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.activeLink = entry.target.id;
        }
      });
    }, options);
    observer.observe(this.homeSection.nativeElement);
    observer.observe(this.introSection.nativeElement);
    observer.observe(this.expertiseSection.nativeElement);
    observer.observe(this.journeySection.nativeElement);
    observer.observe(this.servicesSection.nativeElement);
    observer.observe(this.contactSection.nativeElement);
  }

  ngOnInit(): void{
    this.activeLink = 'home';
    history.replaceState(null, '', '');
    const element = document.getElementById('home');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    window.addEventListener('scroll', this.elementReveal);
    this.phoneNumber = 8807005753;
    this.mailId = 'hamandkumar78@gmail.com';
    this.location = 'https://maps.app.goo.gl/U1aB8qdoHD4SwmVC8';

    const startDate = new Date(2023, 9, 13);
    const presentDate = new Date();

    this.presentMonths = this.getMonthsDifference(startDate, presentDate);
  }

  getMonthsDifference(startDate: Date, presentDate: Date): number {
    const monthsDifference = (presentDate.getFullYear() - startDate.getFullYear()) * 12 +
      (presentDate.getMonth() - startDate.getMonth());
    return monthsDifference;
  }

  isMobileScreen() {
    return window.screen.width <= this.mobileWidth;
  }

  showMenuBar() {
    this.showMenu = !this.showMenu;
    this.menuIconSrc = this.showMenu ? this.closeIconSrc : this.menuBarIconSrc;
  }

  elementReveal() {
    var reveal = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveal.length; i++){
      var windowHeight = window.innerHeight;
      var relvealTop = reveal[i].getBoundingClientRect().top;
      var revealPoint = 150;

      if (relvealTop < windowHeight - revealPoint) {
        reveal[i].classList.add('active');
      }
      else {
        reveal[i].classList.remove('active');
      }
    }
  }

  navigateTo(section: string, check: string): void {
    history.pushState(null, '', '/' + section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    this.activeLink = section;
    if (check != 'fromHome') {
      this.showMenu = !this.showMenu;
      this.menuIconSrc = this.showMenu ? this.closeIconSrc : this.menuBarIconSrc;
    }
  }

  downloadBtn() {
    let btn = document.querySelector('.download-btn') as HTMLButtonElement;
    if (btn) {
      const originalContent = btn.innerHTML;
      const originalStyle = btn.getAttribute('style');
  
      btn.setAttribute('style', 'width: 140px;');
      btn.textContent = 'Downloading';
      let loadingText = 'Downloading';
      let dotsCount = 0;
  
      function updateText() {
        if (btn) {
          btn.textContent = loadingText + '.'.repeat(dotsCount + 1);
          dotsCount = (dotsCount + 1) % 3;
        }
      }
  
      let intervalId = setInterval(updateText, 400);
      let link = document.createElement("a");
      link.download = "hamand_resume";
      link.href = "../../assets/PortfolioAssets/Hamandakkumar_Resume.pdf";
      link.click();
      setTimeout(() => {
        clearInterval(intervalId);
        if (btn) {
          btn.innerHTML = originalContent;
          btn.setAttribute('style', originalStyle || '');
        }
      }, 3000);
    }
  }
  
  closePopup() {
    this.modalRef?.hide();
  }

  viewResume() {
    if (this.viewResumePopup) {
      this.modalRef = this.modalService.show(this.viewResumePopup, {
        class: "model-view-popup",
      });
      this.pdfViewerModuleLoaded = true;
      this.pdfSrc = '../../assets/PortfolioAssets/Hamandakkumar_Resume.pdf';
    }
  }

  onHover(type: string) {
    switch (type) {
      case 'location':
        this.isHovered = type;
        break;
      case 'mail':
        this.isHovered = type;
        break;
      case 'mobile':
        this.isHovered = type;
        break;
      case 'view':
        this.isHovered = type;
        break;
      default:
        break;
    }
  }

  onLeave() {
    this.isHovered = '';
  }

  copy(type: any) {
    switch (type) {
      case 'location':
        this.clipboard.copy(this.location.toString());
        this.popupMessage = 'Location Copied';
        this.closeIcon = '../../assets/PortfolioAssets/cancel-green-icon.png';
        this.showCopiedMessage();
        break;
      case 'mail':
        this.clipboard.copy(this.mailId.toString());
        this.popupMessage = 'E-Mail Id Copied';
        this.closeIcon = '../../assets/PortfolioAssets/cancel-green-icon.png';
        this.showCopiedMessage();
        break;
      case 'mobile':
        this.clipboard.copy(this.phoneNumber.toString());
        this.popupMessage = 'Phone Number Copied';
        this.closeIcon = '../../assets/PortfolioAssets/cancel-green-icon.png';
        this.showCopiedMessage();
        break;
      default:
        break;
    }
  }

  showCopiedMessage() {
    if (this.snackbarTemplate) {
      this.snackBar.openFromTemplate(this.snackbarTemplate, {
        duration: 2000
      });
    }
  }

  closeSnackBar() {
    this.snackBar.dismiss();
  }
}
