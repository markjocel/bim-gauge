import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { collection, addDoc } from "firebase/firestore";
import { environment } from 'src/environments/environment';
import { FirebaseError, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  CHOICES: any[] = [
    'Non-Existent',
    'Identified',
    'Concept done',
    'Managed',
    'Integraded',
    'Optimized'
  ]

  QUESTIONS: any[] = [
    {
      component: 'BIM Usage & Information Flow',
      subs: [
        {
          name: 'BIM Use',
          target: 15,
          unique: 'buse',
          questions: [
            {
              title: 'Visualisation',
              desc: 'The extent to which models are used for design communication',
              choices: [
                'None Considered',
                'Basic screenshots taken from Model for reports etc.',
                'Model used to inform design team through basic visualisations.',
                'Model used to inform Design Team through 3D walkthroughs',
                'Model used to inform client through 3D presentations',
                'Advanced photorealistic renderings/animations taken from model',
              ]
            },
            {
              title: '4D BIM (Construction Sequencing)',
              desc: 'To what extent is the model used to facilitate construction sequencing',
              choices: [
                'None Considered',
                'Model not suitable for construction sequencing',
                'The model was used to simplify phasing using only hide/show',
                'The Design Model is used only by internal project teams for sequencing',
                "The design model prepared by the design team is used to create construction sequencing, but isn't aligned with the construction schedule",
                'Integrated information model and programme manager used to track project progress.',
              ]
            },
            {
              title: '5D BIM (Quantity and Cost)',
              desc: 'Do you perform quantity take-offs based on BIM Models?',
              choices: [
                'None Considered',
                'Model not suitable for quantity take-offs',
                'Model used for some internal quantity information or checking',
                'Schedules are produced from the model, and the model is informally shared with quantity surveyors',
                'The model is formally issued to the Quantity Surveyors and it is cross-checked by the internal project team.',
                'Optimising costs by linking cost data directly to the model.',
              ]
            },
          ]
        },
        {
          name: 'Information Flow',
          target: 30,
          unique: 'inforflow',
          questions: [
            {
              title: 'Information Requirements',
              desc: 'In each phase of a project, does your organization define the level of information that is needed?',
              choices: [
                'No',
                'Not yet, but we have identified several ones',
                'Not yet, but we are working on the definition',
                'Yes, but not in all the phases',
                'Yes, it is precisely defined and integrated',
                'Yes, they are and we have reviewed and implemented',
              ]
            },
            {
              title: 'Interoperability',
              desc: 'To what extent does your organization work with IFC files (Open BIM)?',
              choices: [
                '0',
                '1-20%',
                '21-40%',
                '41-60%',
                '61-80%',
                '81-100%',
              ]
            },
            {
              title: 'Data security and property rights',
              desc: 'Do contractual documents define data security and property rights?',
              choices: [
                'No',
                'Not yet, but we have identified several ones',
                'Not yet, but we are working on the definition',
                'Yes, but only in a few contracts',
                'Yes, both in most contracts',
                'Absolutely',
              ]
            },
            {
              title: 'External communication',
              desc: 'How does your organization communicate with external partners using open standards?',
              choices: [
                'Never',
                'From time to time',
                'Yes, but only a few of them are really open standards',
                'Yes, we use both open and private standards',
                'Yes, most of them are open standards',
                'We only use open standards',
              ]
            },
            {
              title: 'Collaboration-Process',
              desc: 'Do you define process maps for working on BIM models?',
              choices: [
                'Not available',
                'There is an initial idea',
                'The general concept of some standard is defined',
                'We are testing the maps',
                'It is already implemented',
                'It is optimized',
              ]
            },
            {
              title: 'Common Data Environment (CDE)',
              desc: 'Assesses the extent to which a Common Data Environment is used to facilitate the sharing of information',
              choices: [
                'Not available',
                'Legacy network setup',
                'File naming conventions will be agreed upon by the document management system',
                'A company uses a recognised CDE internally',
                'Implementation of wider design teams, including single project-wide CDE',
                'Client, Designers, Contractors have a single CDE for the entire project',
              ]
            },
          ]
        }
      ]
    },
    {
      component: 'STRATEGY (Collaboration and Working Practice)',
      subs: [
        {
          name: 'Coordination',
          target: 20,
          unique: 'coord',
          questions: [
            {
              title: 'Virtual Design Reviews',
              desc: 'To what extent Virtual Design Reviews were conducted before issuing the Model for both coordination and quality assurance purposes',
              choices: [
                'None',
                'Reviews of Single Discipline Model were held. No formal process was established.',
                'Reviews of Multi-Discipline Model were held. No formal process was established.',
                'Regular reviews of Multi-Disciplined virtual models are conducted internaly. Formal Process was established.',
                'All stages of the design process are reviewed by multi-disciplinary team, the client, and the contractor.',
                'The model is thoroughly checked and verified before being released, along with thorough reviews.'
              ]
            },
            {
              title: '3D Coordination',
              desc: 'When and how the model is used during the Design and Construction phases',
              choices: [
                'None Considered',
                'A majority of the elements are modeled, and 3D coordination is conducted ad hoc.',
                'A majority of the elements are modeled, and regular 3D coordination reviews take place but not recorded.',
                'A majority of the elements are modeled, and regular 3D coordination reviews take place and are recorded.',
                'Although all components are modeled, they are not coordinated between disciplines',
                'Every component is modeled and coordinated across disciplines',
              ]
            },
            {
              title: 'Drawings',
              desc: 'Determines the extent to which the model is directly used to generate documentation, such as drawings.',
              choices: [
                'Model not linked to Drawings',
                'Model Partially Linked to Drawings (some 2D)',
                'Models are used to generate plans, sections, etc.',
                'Models are used to generate most of the plans and sections.',
                'Models are used to generate all Plans, Sections, etc.',
                'Models are used to generate all Plans, Sections and Schedules',
              ]
            },
            {
              title: 'Discipline Model Reviews',
              desc: 'In order to ensure information exchange is proper, evaluate whether appropriate checks and validations have been carried out.',
              choices: [
                'No checking of Models',
                'Models are self-checked only by technicians',
                'Models are checked by engineers',
                'Engineer-led reviewing whole of models',
                'Models are fully checked and QA verified as part of the collaboration process',
                'Model and any documentation are cross-checked for quality assurance, including a verification step.',
              ]
            },
          ]
        },
        {
          name: 'Working Practice',
          target: 20,
          unique: 'workprac',
          questions: [
            {
              title: ' Strategic',
              desc: 'What is your primary design workflow?',
              choices: [
                'We have not any clear workflow',
                'Only 2D drafting',
                'Mostly 2D drafting',
                'Mostly 3D Drafting',
                'Only 3D Drafting',
                'BIM Workflow',
              ]
            },
            {
              title: ' Checking',
              desc: 'Do you check the quality of BIM Models?',
              choices: [
                'No',
                '1-20%',
                '21-40%',
                '41-60%',
                '61-80%',
                '81-100%',
              ]
            },
            {
              title: ' Checking',
              desc: 'How often do you carry out clash detection on BIM Models?',
              choices: [
                'No',
                'At the end of the project',
                'Once a month',
                'once every two weeks',
                'once every week',
                'Regularly, following what is agreed on the BEP',
              ]
            },
            {
              title: ' Strategic',
              desc: 'At what percentage do you understand the Level of Information Need (LoIN) required at each project phase?',
              choices: [
                'No',
                '1-20%',
                '21-40%',
                '41-60%',
                '61-80%',
                '81-100%',
              ]
            },
          ]
        }
      ]
    },
    {
      component: 'INFRASTRUCTURE (Tools and Applications)',
      subs: [
        {
          name: 'System',
          target: 15,
          unique: 'syst',
          questions: [
            {
              title: 'Software',
              desc: 'The computer applications used to deliver BIM',
              choices: [
                'No BIM software',
                'Software capable of accepting BIM data',
                'Basic BIM Software systems',
                'Advanced BIM Software Systems',
                'All software systems available to all personnel',
                'Program established for continuous updating of BIM software systems',
              ]
            },
            {
              title: 'Hardware',
              desc: 'Physical devices required to run BIM software',
              choices: [
                'No hardware capable of running BIM software',
                'Some hardware capable of running basic BIM software',
                'All hardware capable of running basic BIM software',
                'Some advanced hardware systems with the organization',
                'All organization hardware is capable of running advanced BIM software',
                'Program established for continuous updating of BIM hardware systems',
              ]
            },
            {
              title: 'Physical spaces',
              desc: 'A physical, functional area to support the delivery of BIM within the organization',
              choices: [
                'No dedicated BIM space',
                'Single workstation for viewing BIM data',
                'Small workspace for collaborating with a screen large enough for multiple viewers',
                'BIM room for collaborating with large screen viewing capability',
                'Multiple collaborative workspaces within regular workspace',
                'Program established for continuous updating of BIM spaces',
              ]
            }
          ]
        },
        {
          name: 'IT Security',
          target: 15,
          unique: 'itsec',
          questions: [
            {
              title: 'Data back up',
              desc: 'Approximately how often does your organization create a data backup?',
              choices: [
                'Never',
                'once a month',
                'Every fortnight',
                'Once a week',
                'Every 2nd day',
                'Daily',
              ]
            },
            {
              title: 'Interoperability',
              desc: 'In terms of data security, how secure do you consider your organization to be?',
              choices: [
                '0',
                '1-20%',
                '21-40%',
                '41-60%',
                '61-80%',
                '81-100%',
              ]
            },
            {
              title: 'Knowledge infrastructure',
              desc: 'Can network solutions for harvesting, storing, and sharing knowledge, both within and between organizations, be easily managed on common platforms?',
              choices: [
                'Not available',
                'Not yet, we have the idea',
                'No, but we are testing it',
                'Yes, but only for few projects',
                'Yes, for most of the projects',
                'Yes, for all of the projects',
              ]
            }
          ]
        }
      ]
    },
    {
      component: 'ORGANIZATION (Organization & Management)',
      subs: [
        {
          name: 'Organizational Requirements',
          target: 10,
          unique: 'orgreq',
          questions: [
            {
              title: 'BIM Exection Plan (BEP)',
              desc: 'Measures the extent to which the project utilises a BIM Execution Plan (BEP) to formalize how information will be managed and delivered in accordance with client requirements',
              choices: [
                'No BIM Execution Plan',
                "There is a BEP but it isn't in use",
                'BEP exists, for internal use only, by core skills',
                'BEP issued to, and used by the whole Design Team',
                'BEP exists for all parties, and based on client BIM-specific information requirements',
                'Working to an agreed BEP becomes a contractual obligation and is signed up to by all parties.',
              ]
            },
            {
              title: 'BIM Contractual Obligations',
              desc: 'To what extent did the project team agree & sign up to contractual obligations, in regards to BIM.',
              choices: [
                'There is no defined BIM agreement in the consultant appointment',
                'BIM agreement poorly defined in consultant appointment',
                "The Company has signed bespoke BIM contractual obligations; other parties' contracts are unknown",
                "The Company has signed defined BIM contractual obligations; other parties' contracts are unknown",
                'BIM contractual obligations were agreed upon by all design teams',
                'There was consensus among all parties, including the supply chain, regarding BIM contractual obligations',
              ]
            },
          ]
        },
        {
          name: 'Strategy',
          target: 20,
          unique: 'strat',
          questions: [
            {
              title: 'BIM Vision',
              desc: "An organization's vision depicts what the organization hopes to become.",
              choices: [
                'No BIM Vision or objectives are defined',
                "Basic BIM Vision is established",
                'Basic BIM objectives are defined',
                'BIM Vision address mission, strategy, and culture',
                'BIM objectives are specific, measurable, relevant and attainable',
                'Vision and objectives are regularly revisited, maintained, and updated',
              ]
            },
            {
              title: 'Management Support',
              desc: "Management's level of support for BIM planning",
              choices: [
                'No management support',
                'Limited support for feasibility study',
                'Full support for BIM Implementation',
                'Full support for BIM implementation with appropriate resource commitment',
                'Limited support for continuing efforts with a limited budget',
                'Full support of continuing efforts.',
              ]
            },
            {
              title: 'BIM Champion',
              desc: 'BIM Champions are technical experts who are motivated and skilled to guide BIM implementation within an organization.',
              choices: [
                'No BIM Champion',
                'BIM Champion identified but limited time committed to BIM initiative',
                'BIM Champion with adequate time commitment',
                'Multiple BIM Champions with each working group',
                'Executive Level BIM support champion with limited time commitment',
                'Executive-level BIM Champion working closely with working group champion',
              ]
            },
            {
              title: 'BIM Planning Committee',
              desc: "A BIM Planning Committee develops the organization's BIM strategy",
              choices: [
                'No BIM Planning Committee established',
                'Small ad-hoc committee with only those interested in BIM',
                'BIM Committee is formalized but not inclusive of all operating units',
                'Multi-disciplinary BIM Planning Committee established with members from all operative units',
                'Planning Committee includes members for all level of organization including executives',
                'BIM Planning decisions are integrated with organizational strategic planning',
              ]
            },
          ]
        },
        {
          name: 'Awareness and Motivation',
          target: 15,
          unique: 'awaremotiv',
          questions: [
            {
              title: 'BIM Vision and General Plans',
              desc: "Does your organization have a BIM-implementation strategy?",
              choices: [
                'No',
                'There is an initial idea',
                'The general concept of some standard is clear',
                'We are testing several standards',
                'Yes, they are implemented',
                'Yes, they are already optimized',
              ]
            },
            {
              title: 'BIM Vision and General Plans',
              desc: "Is there a clear vision of what the use of BIM will accomplish (both long-term and short-term) for your organization?",
              choices: [
                'No',
                'We are thinking about it',
                'We have an initial idea',
                'We have a general idea',
                'Yes, we know what we want to achieve',
                'Yes, we know what we want to achieve and how to implement it',
              ]
            },
            {
              title: 'BIM Vision and dissemination',
              desc: "Which does your organization consider itself to be (in your opinion) a leader, a motivator, or a follower with regards to BIM implementation?",
              choices: [
                'We don’t use BIM',
                'We are still figuring out how to implement it',
                'We try to keep up with the newest techniques',
                'We keep up with the newest techniques',
                'We keep up with the newest techniques and motivate others to do the same',
                'We are pioneers and motivate others to implement BIM',
              ]
            },
          ]
        },

      ]
    },
    {
      component: 'STANDARD (Information Exchange & Data Structure)',
      subs: [
        {
          name: ' Information Exchange',
          target: 10,
          unique: 'infochange',
          questions: [
            {
              title: 'Document / Model Referencing, Version Control and Status',
              desc: 'Measures how well model referencing, version control, and status have been implemented',
              choices: [
                'None considered',
                'It is implemented at the discipline level, but it is not managed',
                'File naming, version control, and status are implemented and managed according to company standards',
                'Project wide file naming, version control and status',
                'Conformity to recognised BIM Standards such as ISO 19650 for version control and status',
                'Project wide file naming, version control and status compliant with recognised BIM Standard; e.g. ISO 19650',
              ]
            },
            {
              title: 'Open Standard deliverables',
              desc: 'The extent to which deliverables are verified by open standard specifications such as IFC, Cobie',
              choices: [
                'None considered',
                'We are thinking about it',
                'We have an initial idea',
                'Model exported to proprietary software (e.g. Navisworks, Solibri)',
                'Successful export/re-import of IFC/COBie verified as a deliverable as part of the information exchange',
                'Successful client handover of IFC/COBie as a deliverable',
              ]
            },
          ]
        },
        {
          name: 'Data Structure',
          target: 15,
          unique: 'datastruc',
          questions: [
            {
              title: 'Model Element Classification',
              desc: 'A classification system is a standardized structure to organise and identify functional elements of a facility',
              choices: [
                'There is no consistent classification system for model elements',
                'In some cases, an ad-hoc element classification system is used',
                'The organization uses a fairly consistent ad-hoc system for classifying elements',
                'The organization uses an industry-recognized element classification system',
                'The organization uses an industry classification system to link to other applications and project partners',
                'An industry classification system has been extended and optimized to meet company needs',
              ]
            },
            {
              title: 'Level of Geometry (LoG)',
              desc: 'The level of Geometry (LoG) describes the level of geometric detail to which a Model Element is to be develop)',
              choices: [
                'No consistent Level of Geometry definition',
                'LoG defined but not standardized within the entire organization',
                'LoG standardized within the organization',
                'Organizational LoG standards aligned with the industry standards',
                'A company BIM object library exists that reflects industry LoG definitions',
                'A company BIM object library exists that reflects the LoG definitions and LoI development',
              ]
            },
            {
              title: 'Level of Information (LoI)',
              desc: 'The Level of Information (LoI) describes the level of information content which a Model element is to contain.',
              choices: [
                'No consistent Level of Information definition',
                'LoI defined but not standardized within the entire organization',
                'LoI standardized within the organization',
                'Organizational LoI standardized aligned with the industry standards',
                'Model View Definitions & Exchange Requirements are used to define LoI',
                'Microcustom-MVD are created by the organisation to meet specific needs',
              ]
            },
          ]
        },

      ]
    },
    {
      component: 'PERSONNEL (Mentality & Culture)',
      subs: [
        {
          name: 'Roles and Responsibilities',
          target: 15,
          unique: 'roleresp',
          questions: [
            {
              title: 'Roles',
              desc: 'Do you have clearly defined roles within your organization?',
              choices: [
                'No',
                'Not yet, but we have a general idea',
                'Not yet, but we are working on the definition',
                'Yes, but only for a few people or projects',
                'Yes, for most of the people or projects',
                'Absolutely',
              ]
            },
            {
              title: 'BIM Roles',
              desc: "Do your organization's roles regarding BIM have a clear definition?",
              choices: [
                'No',
                'Not yet, but we have a general idea',
                'Not yet, but we are working on the definition',
                'Yes, but only for a few people or projects',
                'Yes, for most of the people or projects',
                'Absolutely',
              ]
            },
            {
              title: 'BIM responsible',
              desc: 'Is someone within your organization responsible for ensuring that BIM is used efficiently?',
              choices: [
                'No idea',
                'No',
                'Probably yes',
                'Yes, there is a person',
                'Yes, there is an expert',
                'Yes, there is the director of BIM department',
              ]
            },
          ]
        },
        {
          name: 'Qualification and Training',
          target: 10,
          unique: 'qualitrain',
          questions: [
            {
              title: 'Training',
              desc: 'Does the staff receive any training regarding BIM?',
              choices: [
                'Not really',
                'Not yet, but we are working on the definition',
                'Yes, but not everybody has access to it',
                'Yes, need-based',
                'Yes, periodically',
                'Yes, every employee has a BIM training roadmap',
              ]
            },
            {
              title: 'Experience',
              desc: 'When did your company start to implement BIM?',
              choices: [
                'No experience',
                'Less than one year',
                'Less than 2 years',
                'More than 2 years',
                'More than 5 years',
                'More than 7 years',
              ]
            },
          ]
        },
        {
          name: 'Knowledge Management',
          target: 15,
          unique: 'knowmanage',
          questions: [
            {
              title: 'Collaboration channels',
              desc: 'Is there a method or channel for the transfer of knowledge among employees?',
              choices: [
                'Not really',
                'Not yet, but we are working on the definition',
                'Yes, but not everybody has access to it',
                'Yes, need-based',
                'Yes, periodically and perfectly defined',
                'Yes, and we are constantly removing them',
              ]
            },
            {
              title: 'Feedback',
              desc: 'Is there a mechanism for staff to provide feedback on the information structure and BIM products?',
              choices: [
                'Not really',
                'Not yet, but we are working on the definition',
                'Yes, but not everybody has access to it',
                'Yes, need-based',
                'Yes, periodically and perfectly defined',
                'Yes, and we are constantly removing them',
              ]
            },
            {
              title: 'Platforms',
              desc: 'In your organization, do you actively use a Common Data Environment (CDE) platform?',
              choices: [
                'Not available',
                'Not yet, we have the idea',
                'No, but we are testing it',
                'Yes, but only for a few projects',
                'Yes, for most of the projects',
                'Yes, for all of the projects.',
              ]
            },
          ]
        },

      ]
    }
  ]

  computationTable: any[] = []
  average: any
  constructor(private router: Router) { }

  ngOnInit(): void {
    window.scroll({ top: 0, behavior: 'smooth' })
  }

  compute() {
    let totalScore: number = 0
    this.QUESTIONS.forEach(x => {

      let targetValue = 100 / x.subs.length
      let totalPercentPerSub: { unique: string; total: number; subName: string }[] = [];
      let totalPerFundamental = 0;

      x.subs.forEach((sub: { unique: string; target: number; name: string; questions: any[] }) => {
        let l = document.getElementsByClassName(sub.unique).length

        let totalPerSub = 0

        // for (let index = 0; index < l; index++) {
        //   // Convert to element to get value
        //   let element = document.getElementsByClassName(sub.unique)[index] as HTMLInputElement
        //   let value = parseInt(element.value) - 1
        //   totalPerSub += value
        // }

        let questionAnswers: { question: any; answer: number; }[] = []

        sub.questions.forEach((x, index) => {
          // Convert to element to get value
          let element = document.getElementsByClassName(sub.unique)[index] as HTMLInputElement
          let value = parseInt(element.value) - 1
          totalPerSub += value

          let qObj = {
            question: x.title,
            answer: value
          }

          questionAnswers.push(qObj)
        })

        let percentage = totalPerSub / sub.target * 100

        let obj = {
          unique: sub.unique,
          subName: sub.name,
          total: percentage,
          answers: questionAnswers
        }

        totalPercentPerSub.push(obj)
      })

      totalPercentPerSub = totalPercentPerSub.map(x => {
        let actualValue = x.total * targetValue / 100

        totalPerFundamental += actualValue
        return { ...x, actualValue: actualValue }
      })

      totalScore += totalPerFundamental

      let object = {
        fundamentalName: x.component,
        fundamentalPercent: totalPerFundamental,
        subFundamentalInfo: totalPercentPerSub
      }

      this.computationTable.push(object)
      // console.log(targetValue)
      // console.log(totalPercentPerSub)
      // console.log("*", totalPerFundamental)
    })
    totalScore = totalScore / this.QUESTIONS.length

    this.average = totalScore

    // Push here to firebase
    // Save to local storage
    localStorage.setItem('computationTable', JSON.stringify(this.computationTable))
    localStorage.setItem('totalScore', totalScore.toString())

    this.saveToFirestore()
    // console.warn(this.computationTable)
    this.router.navigate(['/result'])
  }

  displayAnswer(e: any, u: string, i: number, choices: string[]) {
    // Get choice value based on range selector value
    const rangeValue = e.target.value - 1
    const selectedChoice = choices[rangeValue]
    document.getElementsByClassName(u + i)[0].innerHTML = selectedChoice
  }

  async saveToFirestore() {


    const app = initializeApp(environment.firebaseConfig)
    const db = getFirestore(app)
    console.warn(this.computationTable)
    try {
      const docRef = await addDoc(collection(db, "resultInfo"), {
        average: this.average,
        companyProfile: localStorage.getItem('companyForm'),
        results: JSON.stringify(this.computationTable),
        createdAt: new Date().toString()
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

}
