# get_future
* future[meta header]
* std[meta namespace]
* packaged_task[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
future<R> get_future();
```
* future[link ../future.md]

## 概要
結果取得のための`future`オブジェクトを取得する


## 戻り値
`*this`と同じ共有状態を持つ[`future`](../future.md)`<R>`オブジェクトを返す


## 例外
この関数は、以下のerror conditionを持つ[`future_error`](../future_error.md)例外オブジェクトを送出する可能性がある：

- [`future_already_retrieved`](../future_errc.md) ： すでにこの関数によって共有状態が作られている
- [`no_state`](../future_errc.md)： `*this`が共有状態を持っていない(デフォルト構築された`packaged_task`、ムーブされたあとなどに起こりうる)


## 例
```cpp example
#include <iostream>
#include <future>

int calc() { return 3; }

int main()
{
  std::packaged_task<int()> task(calc); // calc()を非同期タスクとして登録
  std::future<int> f = task.get_future(); // 結果値取得のためのfutureを取得

  // タスクを実行
  task();

  // 結果を取得
  int result = f.get();
  std::cout << result << std::endl;
}
```
* get_future()[color ff0000]
* std::future[link /reference/future/future.md]
* task()[link op_call.md]
* f.get()[link /reference/future/future/get.md]

### 出力
```
3
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012


## 参照


