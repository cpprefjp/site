# operator=
* atomic[meta header]
* std[meta namespace]
* atomic[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
atomic& operator=(const atomic&) = delete;          // (1) C++11
atomic& operator=(const atomic&) volatile = delete; // (2) C++11

T operator=(T desired) volatile noexcept;           // (3) C++11
T operator=(T desired) noexcept;                    // (4) C++11
```

## 概要
値を書き込む


## テンプレートパラメータ制約
- (3) :
    - C++20 : `atomic<T>::is_always_lock_free`が`true`であること


## 効果
[`store`](/reference/atomic/atomic/store.md)`(desired)`


## 戻り値
`desired`


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(1);

  x = 2;

  std::cout << x.load() << std::endl;
}
```
* x = 2;[color ff0000]
* x.load()[link load.md]


### 出力
```
2
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified]
    - 2012はコピー代入演算子のdeleteに対応していないため、代わりにprivateで宣言のみ行う手法で代用されている。


## 関連項目
- [C++20 ほとんどの`volatile`を非推奨化](/lang/cpp20/deprecating_volatile.md)


## 参照
- [P1831R1 Deprecating `volatile`: library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p1831r1.html)
    - C++20での、`volatile`版への制約追加
