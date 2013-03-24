#ATOMIC_VAR_INIT
```cpp
#define ATOMIC_VAR_INIT(value) see below
```

##概要

<b>アトミック変数の初期化</b>


##効果

このマクロは、静的ストレージを持つアトミック変数を`value`で初期化するためのトークン列へと展開される(この操作はロックの初期化を必要とするかもしれない)。変数の初期化中に並行アクセスされた場合、それがアトミックな操作であったとしてもデータ競合を引き起こす。


##備考

このマクロは、`atomic`オブジェクトに対しては`atomic<int> x(value);`と書くのと等価である。C言語との互換性のために存在している。


##例

```cpp
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x = ATOMIC_VAR_INIT(3);

  std::cout << x.load() << std::endl;
}
```
* ATOMIC_VAR_INIT[color ff0000]

###出力

```cpp
3
```

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang): ??
- [GCC](/implementation#gcc): 
- [GCC, C++0x mode](/implementation#gcc): 4.7.0
- [ICC](/implementation#icc): ??
- [Visual C++](/implementation#visual_cpp) ??



##実装例

```cpp
#define ATOMIC_VAR_INIT(value) { value }
```

##参照


