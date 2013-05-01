#data
```cpp
T* data() noexcept;const T* data() const noexcept;
```

##効果
配列の先頭へのポインタを返す。

##戻り値

[data(), data() + size()) が適正な範囲になるようなポインター。空ではないvectorに対してはdata() == &front()となる。


##計算量

定数時間である。


##例
<span style='background-color:rgb(239,239,255)'><pre style='margin-top:0px;margin-bottom:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px'><span style='line-height:normal'>#include <iostream>
#include <vector>

int main()
{
  std::vector<int> v = {3, 1, 4};

  int* p = v.<color=ff0000>data</color>();

  std::cout << *p << std::endl;

  ++p;
  std::cout << *p << std::endl;
}</span></pre></span>


###出力
<span style='background-color:rgb(231,231,231);font-size:12px;line-height:normal;white-space:pre'><pre style='margin-top:0px;margin-bottom:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px'><samp>3</samp></pre><pre style='margin-top:0px;margin-bottom:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px'><samp>1</samp></pre></span>



##言語


- C++11
