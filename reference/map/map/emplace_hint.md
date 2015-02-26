#emplace_hint (C++11)
* map[meta header]
* std[meta namespace]
* map[meta class]

```cpp
// since C++11
template <class... Args>
iterator emplace_hint(const_iterator hint, Args&&... args);
```

##概要
要素が配置されるべき場所を示唆するパラメータ `hint` を使って、コンテナに新しい要素を挿入する。要素は直接構築される（コピーもムーブもされない）。要素のコンストラクタはこの関数に渡された引数と同じ引数で呼ばれる。


##パラメータ
- `hint` : 新しい要素をどこへ挿入するかを示唆するために使われるイテレータ
- `args...` : 要素のコンストラクタへ転送される引数パック


##戻り値
挿入が行われたかどうかを示す `bool` と、挿入された要素へのイテレータからなる `pair` を返す。挿入されなかったときは、既存要素へのイテレータを返す。


##計算量
一般にコンテナのサイズについて対数時間だが、新しい要素が `hint` の前に挿入された場合は償却定数時間。


##例
```cpp
#include <iostream>
#include <map>
#include <utility>
#include <tuple>

int main()
{
  std::map<int, char> c;

  c.emplace( std::piecewise_construct, std::make_tuple(1), std::make_tuple('A') );
  c.emplace_hint( c.end(), std::piecewise_construct, std::make_tuple(2), std::make_tuple('B') );
  c.emplace_hint( c.end(), std::piecewise_construct, std::make_tuple(3), std::make_tuple('C') );
  c.emplace_hint( c.end(), std::piecewise_construct, std::make_tuple(4), std::make_tuple('D') );

  for( const auto& pr : c ) {
    std::cout << std::get<0>( pr) << " " << std::get<1>( pr ) << std::endl;
  }

  return 0;
}
```

###出力
```
1 A
2 B
3 C
4 D
```


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??, 11.0


##参照

| 名前 | 説明 |
|-----------------------------------------------------------------------------------------|-----------------------------|
| [`map::emplace`](/reference/map/map/emplace.md) | 要素を直接構築する |
| [`map::insert`](/reference/map/map/insert.md) | 要素を挿入する |


