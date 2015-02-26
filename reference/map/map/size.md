#size
* map[meta header]
* std[meta namespace]

```cpp
size_type size() const noexcept;
```

##概要
コンテナ内の要素の数を返す。


##戻り値
`map` コンテナに格納されている要素の数を返す。 
メンバ型 `size_type` は符号なし整数型である。


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <map>

int main ()
{
  std::map<int,char> c;

  std::cout << c.size() << std::endl;

  c.insert( std::make_pair(1, 'a') );
  c.insert( std::make_pair(2, 'b') );
  c.insert( std::make_pair(3, 'c') );
  c.insert( std::make_pair(1, 'a') );

  std::cout << c.size() << std::endl;

  return 0;
}
```

###出力
```
0
3
```

##バージョン
###言語
- C++03

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??, 11.0


##参照

| 名前 | 説明|
|-------------------------------------------------------------------------------------------|-----------------------------------------------------|
| [`max_size`](/reference/map/map/max_size.md) | 格納可能な最大の要素数を取得する |
| [`empty`](/reference/map/map/empty.md) | コンテナが空であるかどうかを調べる |


