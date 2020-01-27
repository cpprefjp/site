# promise
* future[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class R>
  class promise;
}
```

## 概要
`promise`は、「別スレッドでの処理完了を待ち、その処理結果を取得する」といった非同期処理を実現するためのクラスであり、[`future`](future.md)クラスと組み合わせて使用する。`promise`が別スレッドでの処理結果を書き込み、[`future`](future.md)がその結果を�み取る。`promise`と[`future`](future.md)は内部的に同一の共有状態を参照する。これによってスレッド間での値の受け渡しやスレッド間同期を実現する。

このクラスは`R&`および`void`の、2つの特殊化を持つ。


テンプレートパラメータ：

- `R` ： 結果値の型


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](promise/op_constructor.md) | コンストラクタ | C++11 |
| [`(destructor)`](promise/op_destructor.md) | デストラクタ | C++11 |
| [`operator=`](promise/op_assign.md) | 代入演算� | C++11 |
| [`swap`](promise/swap.md) | 他の`promise`オブジェクトと値を入れ替える | C++11 |


### 結果の取得

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`get_future`](promise/get_future.md) | 結果取得のための`future`オブジェクトを取得する | C++11 |


### 結果の�定

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`set_value`](promise/set_value.md) | 結果の値を�定する | C++11 |
| [`set_exception`](promise/set_exception.md) | 結果の例外を�定する | C++11 |


### 遅延通知による結果の�定

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`set_value_at_thread_exit`](promise/set_value_at_thread_exit.md) | スレッド終了時に結果の値を�定する | C++11 |
| [`set_exception_at_thread_exit`](promise/set_exception_at_thread_exit.md) | スレッド終了時に結果の例外を�定する | C++11 |


### 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`swap`](promise/swap_free.md) | 2つの`promise`オブジェクトを入れ替える | C++11 |


### その他

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`uses_allocator`](promise/uses_allocator.md) | `promise`による特殊化 |


## 例
```cpp example
#include <iostream>
#include <future>
#include <thread>
#include <utility>

void calc(std::promise<int> p)
{
  int sum = 0;
  for (int i = 0; i < 10; ++i) {
    sum += i + 1;
  }

  p.set_value(sum); // 結果値を書き込む
}

int main()
{
  std::promise<int> p;
  std::future<int> f = p.get_future();

  // 別スレッドで計算を行う
  std::thread t(calc, std::move(p));

  // calc()によって書き込まれた結果を取得
  std::cout << f.get() << std::endl;

  t.join();
}
```
* std::promise[color ff0000]
* std::future[link future.md]
* p.set_value[link promise/set_value.md]
* p.get_future()[link promise/get_future.md]
* std::move[link /reference/utility/move.md]
* f.get()[link future/get.md]

### 出力
```
55
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012


## 参照

