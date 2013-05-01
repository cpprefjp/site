#size
```cpp
size_type size() const noexcept;
```

##概要

コンテナの要素数を取得する。


##戻り値

`vector`オブジェクトに含まれる要素数を返す。


##例外
投げない

##計算量

定数時間


##備考

`a.size()` と [`distance`](/reference/iterator/distance.md)(a.[begin](/reference/vector/begin.md)(), a.[end](/reference/vector/end.md)()) は同じ結果になる。


##例

```cpp
<span style='text-indent:0px;background-color:rgb(239,239,255)'><pre style='margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px'><span style='line-height:normal'>#include <iostream>
#include <vector>

int main()
{
  std::vector<int> v = {3, 1, 4, 5, 2};

  std::size_t size = v.size();
  std::cout << size << std::endl;
}</span></pre></span>
```
* size[color ff0000]

###出力

```cpp
<pre style='margin:0px;padding:0px'>5</pre>
```
