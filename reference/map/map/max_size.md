#max_size
```cpp
size_type max_size() const noexcept;
```

##概要
`map` コンテナが格納できる要素の最大数を返す。 
これは、システムやライブラリ実装の制限のもとでコンテナが格納できる潜在的な最大サイズである。


##戻り値
`map` コンテナが自身のコンテンツとして保持できる要素の最大数。 
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
  map<char, int> c;
  
  cout << c.max_size();
  
  return 0;
}
```

###出力例
```
178956970
```

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): ??
- [GCC, C++11 mode](/implementation#gcc.md): ??
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??, 11.0


##参照
| 名前 | 説明 |
|-----------------------------------------------------------------------------------|--------------------------|
| [`size`](/reference/map/map/size.md) | 要素数を取得する |


