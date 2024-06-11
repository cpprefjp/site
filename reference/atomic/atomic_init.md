# atomic_init
* atomic[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]
* cpp20deprecated[meta cpp]

```cpp
namespace std {
  template <class T>
  void atomic_init(volatile atomic<T>* object,
                   T desired) noexcept;                              // (1) C++11

  template <class T>
  void atomic_init(volatile atomic<T>* object,
                   typename atomic<T>::value_type desired) noexcept; // (1) C++17

  template <class T>
  void atomic_init(atomic<T>* object,
                   T desired) noexcept;                              // (2) C++11

  template <class T>
  void atomic_init(atomic<T>* object,
                   typename atomic<T>::value_type desired) noexcept; // (2) C++17
}
```
* atomic[link /reference/atomic/atomic.md]

この関数はC++20で非推奨となった。[`std::atomic`](atomic.md)クラスのデフォルトコンストラクタが値初期化するようになったため、初期化のためにこの関数を使用する必要はない。


## 概要
アトミックオブジェクトを初期化する


## テンプレートパラメータ制約
- (1) :
    - C++20 : `atomic<T>::is_always_lock_free`が`true`であること


## 効果
この関数は、アトミックオブジェクト`object`を値`desired`で非アトミックに初期化する。この関数は、デフォルト構築されたオブジェクトに対して一度だけ呼びださなければならない。変数の初期化中に並行アクセスされた場合、それがアトミックな操作であったとしてもデータ競合を引き起こす。


## 戻り値
なし


## 例外
投げない


## 備考
この関数は、C言語との互換性のために存在している。


## 非推奨の詳細 (C++20)
C言語との互換性のために、`std::atomic`クラスのデフォルトコンストラクタはトリビアルに定義され、初期値は未規定となっていた。そのためこの関数を介して`std::atomic`オブジェクトを初期化する必要があったが、C++20からデフォルトコンストラクタが値初期化を行うようになったため、初期化のためにこの関数を使用する必要はなくなった。


## 例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x;
  std::atomic_init(&x, 1);

  std::cout << x.load() << std::endl;
}
```
* std::atomic_init[color ff0000]
* x.load()[link atomic/load.md]

### 出力
```
1
```


## バージョン
### 言語
- C++11

### 処理系

- [Clang](/implementation.md#clang): 3.3 [mark verified]
- [GCC](/implementation.md#gcc): 
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified]


## 関連項目
- [C++20 ほとんどの`volatile`を非推奨化](/lang/cpp20/deprecating_volatile.md)


## 参照
- [P0558R1 Resolving `atomic<T>` named base class inconsistencies](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0558r1.pdf)
- [P0883R2 Fixing Atomic Initialization, Rev2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0883r2.pdf)
- [P1831R1 Deprecating `volatile`: library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p1831r1.html)
    - C++20での、`volatile`版への制約追加
