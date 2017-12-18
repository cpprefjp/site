# get_id
* thread[meta header]
* std[meta namespace]
* thread[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
id get_id() const noexcept;
```
* id[link id.md]


## 概要
関連付けられているスレッドのスレッド識別子を取得する。


## 戻り値
`thread`オブジェクトがスレッドに関連付けられている場合は、そのスレッドのスレッド識別子。そうでなければデフォルトコンストラクトされた[`thread::id`](id.md)オブジェクト。


## 例外
送出しない。


## 例
```cpp example
#include <thread>
#include <cassert>

int main()
{
  std::thread t1;
  assert( t1.get_id() == std::thread::id() );

  std::thread t2([]{ /*...*/ });
  assert( t2.get_id() != std::thread::id() );

  t2.join();
  return 0;
}
```
* get_id()[color ff0000]
* std::thread::id[link id.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc):
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.3, 4.7.0
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015


## 参照
