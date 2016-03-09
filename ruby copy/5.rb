
#!/usr/bin/env ruby

def cls
  system"clear"
end

class Reading
  def initialize
    @file_list=Dir.glob("*.txt").sort_by{|x| File.stat(x).atime}.reverse
  end
  
  def show_all_files
    @file_list.each_with_index do
      |a,b|
      puts "#{b+1} #{a}"
    end
  end
  
  def load_one_file(choice_num)
    @one_file_array=[]
    File.open(@file_list[choice_num]) do
      |file|
	  div="///////////////////"
	  topics=file.read.split(/(?<=\n)(?=#{div})/).map{|each_topic| each_topic.split(/\n(?![\n\t])/)}
	  #topics=file.readlines("\n\n").map{|each_topic| each_topic.split(/\n(?=\w)/)}
      @one_file_array.concat topics
    end
    @one_file_array
  end
  
end

class List

  def initialize(topic_array)
    @topic_array=topic_array
    @count=Array.new(topic_array.size, 0)
  end
  
  def topic_array
    @topic_array
  end
  
  def show_all_topics
    @topic_array.each_with_index do
      |a,b|
      headline = "#{b+1} #{a[0]} practiced #{@count[b]} time#{"s" if @count[b]>1}"
	  puts "-"*headline.size
	  puts headline
      a[1..-1].each do
        |each_question|
		question, answer=each_question.split(/\t/, 2)
        print " [#{question.chomp}] "
      end
      puts "\n\n"
    end
  end
  
  def show_questions(choice)
    @count[choice]+=1
    choosen_practice=@topic_array[choice][1..-1]
	print "you are practising: >>> ", @topic_array[choice][0][/[^:]+/], " <<<\n\n"
    choosen_practice.shuffle.each_with_index do
      |questionStr, num|
	  question, answer=questionStr.split(/(?=\t)/, 2)
      puts "#{num+1} of #{choosen_practice.size} #{question}"
	  gets
	  puts "answer:\n_______________\n\n\n"
	  puts answer
      puts "\n\n_______________\nhit enter to continue"
      gets
	  cls
    end
  end
  
end

loop do

	reading=Reading.new
	reading.show_all_files
	puts "which file to open?"
	topic_num=gets.to_i-1
	topic_array=reading.load_one_file(topic_num)
	list=List.new(topic_array)
	cls
	choice=nil

		loop do
		  list.show_all_topics
		  puts "which one to practice?"
		  puts "     you have just practiced >>>> #{list.topic_array[choice][0][0..-2]}" if choice
		  choice=gets
		  case choice
		  when "e\n" then break
		  when "\n" then choice = rand list.topic_array.size
		  else 
			puts choice
			choice=choice.to_i-1
		  end
		  cls
		  list.show_questions choice
		  cls
		end
		
	cls
	
end