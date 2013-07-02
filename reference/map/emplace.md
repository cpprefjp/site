#emplace
```cpp
// since C++11
template <class... Args> pair<iterator, bool>
emplace(Args&&... args);
```

##概要
コンテナに新しい要素を挿入する。要素は直接構築される（コピーもムーブもされない）。要素のコンストラクタはこの関数に渡された引数を与えることによって呼ばれる。


##パラメータ
- `args...` : 要素のコンストラクタへ転送される引数パック。

##戻り値
挿入されたかどうかを示す `bool` と、挿入された要素へのイテレータからなる `pair` を返す。挿入されなかったときは、既存要素へのイテレータを返す。


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
  map<int, char> c;
  
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
| [`emplace_hint`](./emplace_hint.md) | ヒントを使って要素を直接構築する |
| [`insert`](./insert.md) | 要素を挿入する |


