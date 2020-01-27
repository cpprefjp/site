# undeclare_reachable
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  T* undeclare_reachable(T* p);
}
```

## 概要
ポインタの到達可能の宣言を取り下げる。


## 要件
`p`が非ヌルである場合：

- `p`の参照するオブジェクトは到達可能であると既に宣言されている。
- 最後の`undeclare_reachable(p)`の呼び出しまで生�している。


## 効果
[`declare_reachable`](declare_reachable.md)`(p)`と`undeclare_reachable(p)`が同じ回数呼び出された時、非ヌルな`p`の参照するオブジェクトの到達可能の宣言が取り消される。

これが起きた場合、`p`の参照するオブジェクトに対するポインタからは間接参照できなくなる。


## 戻り値
`p`と�しい[Safely-derived](pointer_safety.md)な`p`の複製。

`p`に対する宣言が取り消されば場合、戻り値のポインタは[Safely-derived](pointer_safety.md)なので、たとえ[Safely-derived](pointer_safety.md)なポインタが�在しなくとも、戻り値からは`p`の参照するオブジェクトにアクセスできる。


## 例外
なし


## 備考
- `declare_reachable()`で確保されたメモリは、その宣言の取り消しまで解放されない。
- 長時間稼働するプ�グラムは、２つの関数の呼び出しがそれぞれ対応するように整えるべきである。
- この関数がテンプレート引数を取るのは、戻り値が使用されることを想定しているためである。


## 例
```cpp example
#include <memory>
#include <cstdlib>

int main()
{
  int* p = new int(100);
  std::undeclare_reachable(p); // ill-formed
  return EXIT_SUCCESS;
}
```
* std::undeclare_reachable[color ff0000]
* EXIT_SUCCESS[link /reference/cstdlib/exit_success.md]

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): ?
- [Clang](/implementation.md#clang): 3.4 (relaxed実装)
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013 (relaxed実装)
