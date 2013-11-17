#size
```cpp
size_type size() const noexcept;
```

##概要
コンテナ内の要素の数を返す。


##戻り値
`multimap` コンテナに格納されている要素の数を返す。 
メンバ型 `size_type` は符号なし整数型である。


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <map>
using namespace std;

int main ()
{
  multimap<int,char> c;

  cout << c.size() << endl;

  c.insert( std::make_pair(1, 'a') );
  c.insert( std::make_pair(2, 'b') );
  c.insert( std::make_pair(3, 'c') );
  c.insert( std::make_pair(1, 'a') );

  cout << c.size() << endl;

  return 0;
}
```

###出力
```
0
4
```

##バージョン
###言語
- C++03

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): ??
- [GCC, C++11 mode](/implementation#gcc.md): 4.7.2
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??, 11.0


##参照

| 名前 | 説明|
|-------------------------------------------------------------------------------------------|-----------------------------------------------------|
| [`max_size`](/reference/map/multimap/max_size.md) | 格納可能な最大の要素数を取得する |
| [`empty`](/reference/map/multimap/empty.md) | コンテナが空であるかどうかを調べる |


