#emplace(C++11)
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

using namespace std;

int main() 
{
  multimap<int, char> c;

  c.emplace( piecewise_construct, make_tuple(1), make_tuple('A') );

  cout << get<0>( *c.begin() ) << " " << get<1>( *c.begin() ) << endl;

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
- [Clang](/implementation#clang.md): 3.2 3.3
- [GCC](/implementation#gcc.md): ??
- [GCC, C++11 mode](/implementation#gcc.md): ??
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??, 11.0

##参照

| 名前 | 説明 |
|---------------------------------------------------------------------------------------------------|----------------------------------------------|
| [`multimap::emplace_hint`](/reference/map/multimap/emplace_hint.md) | ヒントを使って要素を直接構築する |
| [`multimap::insert`](/reference/map/multimap/insert.md) | 要素を挿入する |


