# address
* atomic[meta header]
* std[meta namespace]
* atomic_ref[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr T* address() const noexcept;
```

## 概要
参照しているオブジェクトのアドレスを取得する。

### この関数を必要とする状況
#### データ構造の要素へのアトミックアクセス
配列の各要素にアトミックアクセスする際、[`std::atomic`](/reference/atomic/atomic.md)オブジェクトでは以下のように記述する。

```cpp
std::array<std::atomic<int>, N> array;

int fetch_add_idx(std::atomic<int>* base, size_t i, int value) {
  return base[i].fetch_add(value);
}
```
* fetch_add[link fetch_add.md]

これを`std::atomic_ref`で記述する場合、アトミック性をもたせてアクセスするには、この関数を使用して以下のようにする。

```cpp
int fetch_add_idx(std::atomic_ref<int> base, size_t i, int value) {
  int* p = base.address();
  return std::atomic_ref{*(p+i)}.fetch_add(value);
}
```
* fetch_add[link fetch_add.md]

#### 必要なときにのみアトミックアクセスする
以下の例では、複数のスレッドが並行にメモリにアクセスし、カウンタをインクリメントすることでアクセス終了を知らせている。最後のスレッドはメモリにアクセスする余分な処理を実行する必要があるが、並行にメモリにアクセスするほかのスレッドがないため、これらのアクセスはアトミックである必要がない：

```cpp
void thread(atomic_ref<int>* data, atomic_ref<int> counter, int nthreads) {
  data->fetch_add(42, memory_order_relaxed);
  int* d = data->address();       // dataへの生ポインタを取得
  data->~atomic_ref();            // このスレッドのデータへのatomic_refを破棄する
  int pos = counter.fetch_add(1); // データの破棄が完了したことを伝える
  if (pos != (nthreads - 1))
    return;

  // 最後のスレッド: アトミックアクセスする必要がない
  int last_data = *d; // 非アトミックアクセス
  // …
} 
```


## 戻り値
`*this`が参照するオブジェクトをアドレス値を返す


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <atomic>
#include <thread>

void f(std::atomic_ref<int> ar, int i) {
  int* p = ar.address();
  std::atomic_ref{p + i}.fetch_add(1);
}

int main()
{
  int ar[3] = {};

  std::thread t1{[&ar]{ f(std::atomic_ref{ar[0]}, 1); }};
  std::thread t2{[&ar]{ f(std::atomic_ref{ar[0]}, 1); }};

  t1.join();
  t2.join();

  std::cout << ar[1] << std::endl;
}
```
* address()[color ff0000]
* fetch_add[link fetch_add.md]


### 出力
```
2
```


## バージョン
### 言語
- C++26


### 処理系
- [Clang](/implementation.md#clang): 19.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 14 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2835R7 Expose `std::atomic_ref` 's object address](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2835r7.html)
