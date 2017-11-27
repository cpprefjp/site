# once_flag
* mutex[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  struct once_flag;
}
```

## 概要
`once_flag`は、一度だけ指定された処理を呼び出す[`call_once()`](/reference/mutex/call_once.md)関数で、呼び出し済みかどうかの状態フラグとして使用するクラスである。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|----------------|-------|
| [`(constructor)`](once_flag/op_constructor.md) | コンストラクタ | C++11 |
| `~once_flag() = default`                    | デストラクタ   | C++11 |
| `operator=(const once_flag&) = delete`      | 代入演算子     | C++11 |


## 例
```cpp example
#include <iostream>
#include <thread>
#include <mutex>

std::once_flag once;

void init()
{
  // 初期化を行う...
  std::cout << "initialize" << std::endl;
}

void thread_proc()
{
  std::call_once(once, init);
}

int main()
{
  std::thread t1(thread_proc);
  std::thread t2(thread_proc);
  std::thread t3(thread_proc);

  t1.join();
  t2.join();
  t3.join();
}
```
* std::once_flag[color ff0000]
* std::call_once[link call_once.md]

### 出力
```
initialize
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0, 14.0


## 参照

