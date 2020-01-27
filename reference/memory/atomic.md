# atomic
* memory[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T> struct atomic; // 先行宣言

  template <class T> struct atomic<shared_ptr<T>>;
  template <class T> struct atomic<weak_ptr<T>>;
}
```
* shared_ptr[link shared_ptr.md]
* weak_ptr[link weak_ptr.md]

## 概要
`<memory>`ヘッダでは、[`std::shared_ptr`](shared_ptr.md)と[`std::weak_ptr`](weak_ptr.md)クラスに対する[`std::atomic`](/reference/atomic/atomic.md)クラスの特殊化を定義する。

これらの特殊化を使用することで、共通のスマートポインタオブジェクトに対する複数スレッドでの操作をアトミックに行える。


### 共通メンバ関数
| 名前 | 説明 | 対応バージョン |
|------|------|-----|
| [`(constructor)`](/reference/atomic/atomic/op_constructor.md) | コンストラクタ | C++20 |
| `~atomic() = default`                       | デストラクタ | C++20 |
| [`operator=`](/reference/atomic/atomic/op_assign.md)          | 代入演算� | C++20 |
| [`is_lock_free`](/reference/atomic/atomic/is_lock_free.md)    | オブジェクトが�ックフリーに振る舞えるかを判定する | C++20 |
| [`store`](/reference/atomic/atomic/store.md)                  | 値を書き込む | C++20 |
| [`load`](/reference/atomic/atomic/load.md)                    | 値を�み込む | C++20 |
| [`operator T`](/reference/atomic/atomic/op_t.md)              | 型Tへの変換演算� | C++20 |
| [`exchange`](/reference/atomic/atomic/exchange.md)            | 値を入れ替える | C++20 |
| [`compare_exchange_weak`](/reference/atomic/atomic/compare_exchange_weak.md) | 弱い比較で値を入れ替える | C++20 |
| [`compare_exchange_strong`](/reference/atomic/atomic/compare_exchange_strong.md) | 強い比較で値を入れ替える | C++20 |
| [`wait`](/reference/atomic/atomic/wait.md) | 起床されるまで待機する | C++20 |
| [`notify_one`](/reference/atomic/atomic/notify_one.md) | 待機しているスレッドをひとつ起床させる | C++20 |
| [`notify_all`](/reference/atomic/atomic/notify_all.md) | 待機している全てのスレッドを起床させる | C++20 |


### 共通メンバ型
| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `value_type` | 要素型となるテンプレートパラメータの型`T`。<br/> `shared_ptr`に対する特殊化では`shared_ptr<T>`となる。<br/> `weak_ptr`に対する特殊化では`weak_ptr<T>`となる | C++20 |


### 共通メンバ定数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `static constexpr bool is_always_lock_free` | 型`T`に対するアトミック操作が常に�ックフリー (非ミューテックス) で動作する場合は`true`、そうでなければ`false` | C++20 |


### 例
```cpp example
#include <iostream>
#include <memory>
#include <thread>

std::atomic<std::shared_ptr<int>> resource;

// Producer-Consumerパターン。
// 供給者スレッドがデータを作成し、消費者スレッドが供給されたデータを使用する
void producer() {
  std::shared_ptr<int> x{new int(3)};
  resource.store(x);
}

void consumer() {
  // データが供給されたら、resourceとyを入れ替える (resourceが空になり、yにデータが入る)。
  std::shared_ptr<int> y;
  while (!resource.exchange(y)) {
    std::cout << *y << std::endl;
  }
}

int main()
{
  std::thread consumer_thread{consumer};
  std::thread producer_thread{producer};

  consumer_thread.join();
  producer_thread.join();
}
```
* std::atomic<std::shared_ptr<int>>[color ff0000]
* resource.store[link /reference/atomic/atomic/store.md]
* resource.exchange[link /reference/atomic/atomic/exchange.md]
* consumer_thread.join()[link /reference/thread/thread/join.md]
* producer_thread.join()[link /reference/thread/thread/join.md]

### 出力
```
3
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc):
- [Visual C++](/implementation.md#visual_cpp): ??


### 参照
- [P0718R2 Revising `atomic_shared_ptr` for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0718r2.html)
- [cplusplus/draft #2824 - add forward declaration of `atomic` class for `atomic<shared_ptr<T>>` (P0718R2)](https://github.com/cplusplus/draft/pull/2824)
- [P1644R0 Add wait/notify to `atomic<shared_ptr<T>>`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1644r0.html)
