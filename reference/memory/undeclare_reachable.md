#undeclare_reachable
```cpp
namespace std {
  template<class T>
  T* undeclare_reachable(T* p);
}
```

##概要
ポインタの到達可能の宣言を取り下げる。

##要件
`p`が非nullである場合：
* `p`の参照するオブジェクトは到達可能であると既に宣言されている。
* 最後の`undeclare_reachable(p)`の呼び出しまで生存している。

##効果
`declare_reachable(p)`と`undeclare_reachable(p)`が同じ回数呼び出された時、
非nullな`p`の参照するオブジェクトの到達可能の宣言が取り消される。
これが起きた場合、`p`の参照するオブジェクトに対するポインタからは間接参照できなくなる。

##戻り値
`p`と等しいSafely-derivedな`p`の複製。
`p`に対する宣言が取り消されば場合、戻り値のポインタはSafely-derivedなので、
たとえSafely-derivedなポインタが存在しなくとも、戻り値からは`p`の参照するオブジェクトにアクセスできる。

##例外
なし

##備考
* `declare_reachable()`で確保されたメモリは、その宣言の取り消しまで解放されない。
* 長時間稼働するプログラムは、２つの関数の呼び出しがそれぞれ対応するように整えるべきである。
* この関数がテンプレート引数を取るのは、戻り値が使用されることを想定しているためである。

##例
```cpp
#include <memory>
#include <cstdlib>

int main()
{
  int* p = new int(100);
  std::undeclare_reachable(p); // ill-formed
  return EXIT_SUCCESS;
}
```

##バージョン
###言語
- C++11

###処理系
- GCC: ?
- Clang: ?
- Intel: ?
- Visual C++: ?
