#max_size
```cpp
size_type max_size() const noexcept;
```

##概要
`multimap` コンテナが格納できる要素の最大数を返す。 
これは、システムやライブラリ実装の制限のもとでコンテナが格納できる潜在的な最大サイズである。


##戻り値
`multimap` コンテナが自身のコンテンツとして保持できる要素の最大数。 
メンバ型 `size_type` は符号なし整数型である。


##計算量
定数時間。


##例
```cpp
#include <iostream>
#include <map>
using namespace std;
 
int main ()
{
  multimap<char, int> c;
  
  cout << c.max_size();
  
  return 0;
}
```

###出力例
```
178956970
```

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??, 11.0


##参照
| 名前 | 説明 |
|-----------------------------------------------------------------------------------|--------------------------|
| [`size`](/reference/map/multimap/size.md) | 要素数を取得する |


