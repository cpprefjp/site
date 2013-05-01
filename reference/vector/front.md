#front
```cpp
reference front();const_reference front() const;
```

##概要

先頭要素への参照を取得する。


##戻り値

先頭要素への参照


##計算量

定数時間


##備考

a.front() と *a.begin() は同じ結果になる。


##例

```cpp
<span style='text-indent:0px;background-color:rgb(239,239,255);line-height:normal;white-space:pre'><pre style='margin:0px;padding:0px'>#include <iostream>
#include <vector>

int main()
{
  std::vector<int> v = {3, 1, 4};

  int& x = v.front();
  std::cout << x << std::endl;
}</pre></span>
```

###出力

```cpp
<pre style='margin:0px;padding:0px'><samp>3</samp></pre>
```

##
