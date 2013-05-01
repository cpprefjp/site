#max_size
```cpp
size_type max_size() const noexcept;
```

##概要

　set コンテナが格納できる要素の最大数を返す。

　これは、システムやライブラリ実装の制限のもとでコンテナがリーチできる潜在的な最大サイズである。


##戻り値

　set コンテナが自身のコンテンツとして保持できる要素の最大数。

　メンバ型 size_type は符号なし整数型である。


##計算量

　定数時間。


##例

```cpp
<pre style='margin-top:0px;margin-bottom:0px;padding-bottom:5px;padding-top:3px;padding-left:10px;line-height:normal;background-color:rgb(240,240,240)'>#include <iostream>
#include <set>
using namespace std;
 
int main ()
{
  set<int> c;
  
  cout << c.max_size();
  
  return 0;
}</pre>
```

###出力

```cpp
1073741823
```

##参照

| | |
|-----------------------------------------------------------------------------------|--------------------------|
| [set::size](/reference/set/size.md) | 要素数を取得する |


