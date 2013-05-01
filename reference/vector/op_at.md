#operator[]
```cpp
reference operator[](size_type n);const_reference operator[](size_type n) const;
```

##要件



##効果



##戻り値

a[n] はn番目の要素への参照を返す。aがconstである場合にはconst参照を返す。


##計算量



##備考

a[n] と *(a.begin() + n) は同じ結果になる。


##例

```cpp
<span style='text-indent:0px;background-color:rgb(239,239,255)'><pre style='margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px'><span style='line-height:normal'>#include <iostream>
#include <vector>

int main()
{
  std::vector<int> v = {3, 1, 4};

  // 2番目の要素を参照する
  int& x = v[2];
  std::cout << x << std::endl;
}</span></pre></span>
```

###出力

```cpp
<pre style='margin:0px;padding:0px'><samp>4</samp></pre>
```
