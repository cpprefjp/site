# compare_exchange_strong
* atomic[meta header]
* std[meta namespace]
* atomic_ref[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
bool
  compare_exchange_strong(T& expected,
                          T desired,
                          memory_order success,
                          memory_order failure
                          ) const noexcept;  // (1) C++20
bool
  compare_exchange_strong(value_type& expected,
                          value_type desired,
                          memory_order success,
                          memory_order failure
                          ) const noexcept;  // (1) C++26

bool
  compare_exchange_strong(T& expected,
                          T desired,
                          memory_order order = memory_order_seq_cst
                          ) const noexcept;  // (2) C++20
bool
  compare_exchange_strong(value_type& expected,
                          value_type desired,
                          memory_order order = memory_order_seq_cst
                          ) const noexcept;  // (2) C++26
```
* memory_order[link /reference/atomic/memory_order.md]
* memory_order_seq_cst[link /reference/atomic/memory_order.md]

## 概要
強い比較で値を入れ替える。

- (1) : 現在の値と`expected`が等値である場合に、`success`メモリオーダーで現在の値を`desired`で置き換え、そうでなければ`failure`メモリオーダーで`expected`を現在の値で置き換える
- (2) : 現在の値と`expected`が等値である場合に、現在の値を`desired`で置き換え、そうでなければ`expected`を現在の値で置き換える。どちらの値置き換えの場合でも`order`メモリオーダーが使用される


## テンプレートパラメータ制約
- C++26 : [`is_const_v`](/reference/type_traits/is_const.md)`<T>`が`false`であること


## 事前条件
- `failure`が[`memory_order_release`](/reference/atomic/memory_order.md), [`memory_order_acq_rel`](/reference/atomic/memory_order.md)ではないこと


## 効果
現在の値と`expected`をバイトレベルで等値比較を行い、`true`である場合は現在の値を`desired`で置き換え、`false`である場合は`expected`を現在の値で置き換える。

- (1) : バイト等値比較が`true`の場合は`success`メモリオーダー、`false`の場合は`failure`メモリオーダーに従って、アトミックに値の置き換えが行われる
- (2) : アトミックな値置き換えでは`order`メモリオーダーが使用される


## 戻り値
この関数を呼び出す前の`*this`が保持する値と`expected`の等値比較の結果が返される。等値であれば`true`、そうでなければ`false`が返る。


## 例外
投げない


## 備考
この関数は、値が交換可能な場合はCAS (compare-and-swap) 操作が常に成功する。

[`compare_exchange_weak()`](compare_exchange_weak.md)はより弱い命令であり、交換可能な場合でもCAS操作が失敗する可能性がある。

通常、CAS操作は、CASが成功するまでループさせる。

しかし、もしCAS操作でSpurious Failureが発生しなければループさせる必要が無くなるといった状況であれば、`compare_exchange_strong()`を使うことで効率良くCASを行うことができる。

逆に言えば、そのような状況でないなら常にループで[`compare_exchange_weak()`](compare_exchange_weak.md)を利用すれば良い。


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  {
    int value = 3;
    std::atomic_ref<int> x{value};

    // x == expectedなので、xは2に置き換えられる
    int expected = 3;
    bool result = x.compare_exchange_strong(expected, 2);

    std::cout << std::boolalpha << result << " " << value << " " << expected << std::endl;
  }
  {
    int value = 3;
    std::atomic_ref<int> x{value};

    // x != expectedなので、expectedがxの値で置き換えられる
    int expected = 1;
    bool result = x.compare_exchange_strong(expected, 2);

    std::cout << std::boolalpha << result << " " << value << " " << expected << std::endl;
  }
}
```
* compare_exchange_strong[color ff0000]

#### 出力
```
true 2 3
false 3 3
```

### フラグのオン・オフをする例
```cpp example
#include <iostream>
#include <atomic>
#include <thread>

class my_flag {
  bool value_ = false;
public:
  void atomic_set() {
    // 値がfalseだったらtrueにする。
    // falseでなかったら (true) 、そのまま
    bool expected = false;
    std::atomic_ref{value_}.compare_exchange_strong(expected, true);
  }

  // 非アトミックな値取得
  bool get() const {
    return value_;
  }
};

int main()
{
  my_flag x;

  // いずれかのスレッドの処理がおわったら (成功したら) フラグをオンにする
  std::thread t1 {[&x] {
    x.atomic_set();
  }};
  std::thread t2 {[&x] {
    x.atomic_set();
  }};

  t1.join();
  t2.join();

  std::cout << std::boolalpha << x.get() << std::endl;
}
```
* compare_exchange_strong[color ff0000]

#### 出力
```
true
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3323R1 cv-qualified types in `atomic` and `atomic_ref`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3323r1.html)
    - C++26でCV修飾されたテンプレート引数を受け取れるようになった
