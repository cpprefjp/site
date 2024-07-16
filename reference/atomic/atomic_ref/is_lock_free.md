# is_lock_free
* atomic[meta header]
* std[meta namespace]
* atomic_ref[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
bool is_lock_free() const noexcept;
```

## 概要
オブジェクトに対する操作がロックフリーに振る舞えるかを判定する


## 戻り値
`atomic_ref<T>`型のすべてのオブジェクトに対する操作がロックフリーに振る舞えるなら`true`、そうでなければ`false`を返す。

`false`を返す場合は、ロックで実装されることを意味する。


## 備考
- このクラスは、ミューテックスによって実装される場合がある。たとえばシグナルハンドラ内では、ミューテックス実装の場合にデッドロックが発生するため、ロックフリーで実装されている必要がある
- 実行時の状況によらず常にロックフリーに振る舞えるかを表す`atomic_ref::is_always_lock_free`メンバ定数が定義されているが、こちらは動的リンクライブラリのバージョンアップなどで、将来的にロックフリーに振る舞う可能性がある場合などに値が変動する


## 例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  int value = 1;
  std::atomic_ref<int> x{value};

  if (x.is_lock_free()) {
    std::cout << "atomic_ref<int> is lock-free" << std::endl;
  }
  else {
    std::cout << "atomic_ref<int> isn't lock-free" << std::endl;
  }
}
```
* is_lock_free[color ff0000]


### 出力例
```
atomic_ref<int> is lock-free
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1960R0 NB Comment Changes Reviewed by SG1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1960r0.html)
    - 対象を「オブジェクト」から「`atomic_ref<T>`型のすべてのオブジェクト」に変更
