#emplace_hint (C++11)
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
挿入された要素へのイテレータを返す。


##計算量
一般にコンテナのサイズについて対数時間だが、新しい要素が `hint` の前に挿入された場合は償却定数時間。


##例
```cpp
#include <iostream>
#include <map>
#include <utility>
#include <tuple>

using namespace std;

int main() 
{
  multimap<int, char> c;

  c.emplace( piecewise_construct, make_tuple(1), make_tuple('A') );
  c.emplace_hint( c.end(), piecewise_construct, make_tuple(2), make_tuple('B') );
  c.emplace_hint( c.end(), piecewise_construct, make_tuple(3), make_tuple('C') );
  c.emplace_hint( c.end(), piecewise_construct, make_tuple(4), make_tuple('D') );

  for( const auto& pr : c ) {
    cout << get<0>( pr) << " " << get<1>( pr ) << endl;
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
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): ??
- [GCC, C++11 mode](/implementation#gcc.md): ??
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??, 11.0


##参照

| 名前 | 説明 |
|-----------------------------------------------------------------------------------------|-----------------------------|
| [`multimap::emplace`](/reference/map/multimap/emplace.md) | 要素を直接構築する |
| [`multimap::insert`](/reference/map/multimap/insert.md) | 要素を挿入する |


