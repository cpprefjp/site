#emplace (C++11)
* map[meta header]
* std[meta namespace]
* multimap[meta class]
* function[meta id-type]

```cpp
// since C++11
template <class... Args> iterator 
emplace(Args&&... args);
```

##概要
コンテナに新しい要素を挿入する。要素は直接構築される（コピーもムーブもされない）。要素のコンストラクタはこの関数に渡された引数を与えることによって呼ばれる。

##パラメータ
- `args...` : 要素のコンストラクタへ転送される引数パック。

##戻り値
挿入された要素へのイテレータを返す。

##計算量
コンテナサイズについて対数時間。


##例
```cpp
#include <iostream>
#include <map>
#include <utility>
#include <tuple>

int main()
{
  std::multimap<int, char> c;

  c.emplace( std::piecewise_construct, std::make_tuple(1), std::make_tuple('A') );

  std::cout << std::get<0>( *c.begin() ) << " " << std::get<1>( *c.begin() ) << std::endl;

  return 0;
}
```

###出力
```
1 A
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 3.2 3.3
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??, 11.0

##参照

| 名前 | 説明 |
|---------------------------------------------------------------------------------------------------|----------------------------------------------|
| [`multimap::emplace_hint`](/reference/map/multimap/emplace_hint.md) | ヒントを使って要素を直接構築する |
| [`multimap::insert`](/reference/map/multimap/insert.md) | 要素を挿入する |


