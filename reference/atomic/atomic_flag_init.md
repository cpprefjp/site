# ATOMIC_FLAG_INIT
* atomic[meta header]
* macro[meta id-type]
* cpp11[meta cpp]
* cpp20deprecated[meta cpp]

```cpp
# define ATOMIC_FLAG_INIT see below
```
* see below[italic]

この機能はC++20で非推奨となった。[`std::atomic_flag`](atomic_flag.md)クラスのデフォルトコンストラクタが値初期化するようになったため、初期化のためにこの機能を使用する必要はない。


## 概要
フラグを初期化する。

このマクロは、[`atomic_flag`](atomic_flag.md)オブジェクトの初期化に使用し、フラグをクリア状態にする。静的オブジェクトに対しては、その初期化は静的に行われなければならない。


## 非推奨の詳細 (C++20)
C言語との互換性のために、`std::atomic_flag`クラスのデフォルトコンストラクタはトリビアルに定義され、初期値は未規定となっていた。そのためこの機能を介して`std::atomic_flag`オブジェクトを初期化する必要があったが、C++20からデフォルトコンストラクタが値初期化を行うようになったため、初期化のためにこの機能を使用する必要はなくなった。


## 例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  std::atomic_flag x = ATOMIC_FLAG_INIT;

  // フラグを立て、変更前の値を確認する
  bool before = x.test_and_set();
  std::cout << std::boolalpha << before << std::endl;
}
```
* ATOMIC_FLAG_INIT[color ff0000]
* std::atomic_flag[link atomic_flag.md]
* x.test_and_set()[link atomic_flag/test_and_set.md]


### 出力
```
false
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified]


## 参照
- [P0883R2 Fixing Atomic Initialization, Rev2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0883r2.pdf)
