# ATOMIC_VAR_INIT
* atomic[meta header]
* macro[meta id-type]
* cpp11[meta cpp]
* cpp20deprecated[meta cpp]

```cpp
#define ATOMIC_VAR_INIT(value) see below
```

この機能はC++20で非推奨となった。[`std::atomic`](atomic.md)クラスのデフォルトコンストラクタが値初期化するようになったため、初期化のためにこの機能を使用する必要はない。


## 概要
アトミック変数の初期化


## 効果
このマクロは、静的ストレージを持つアトミック変数を`value`で初期化するためのトークン列へと展開される(この操作はロックの初期化を必要とするかもしれない)。変数の初期化中に並行アクセスされた場合、それがアトミックな操作であったとしてもデータ競合を引き起こす。


## 備考
このマクロは、`atomic`オブジェクトに対しては`atomic<int> x(value);`と書くのと等価である。C言語との互換性のために存在している。


## 非推奨の詳細 (C++20)
C言語との互換性のために、`std::atomic`クラスのデフォルトコンストラクタはトリビアルに定義され、初期値は未規定となっていた。そのためこの機能を介して`std::atomic`オブジェクトを初期化する必要があったが、C++20からデフォルトコンストラクタが値初期化を行うようになったため、初期化のためにこの機能を使用する必要はなくなった。


## 例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x = ATOMIC_VAR_INIT(3);

  std::cout << x.load() << std::endl;
}
```
* ATOMIC_VAR_INIT[color ff0000]
* x.load()[link atomic/load.md]


### 出力
```
3
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified]


## 実装例
```cpp
#define ATOMIC_VAR_INIT(value) { value }
```

## 参照
- [P0883R2 Fixing Atomic Initialization, Rev2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0883r2.pdf)
