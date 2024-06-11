# id
* thread[meta header]
* std[meta namespace]
* jthread[meta class]
* type-alias[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  class jthread {
  public:
    using id = thread::id;
  };
}
```
* thread::id[link /reference/thread/thread/id.md]

## 概要
スレッド識別子。[`std::thread::id`](/reference/thread/thread/id.md)の別名。

実行のスレッドに対して一意な`thread::id`が対応づけられる。デフォルト構築された`id`はいかなるスレッドとも対応付けられない（ポインタ型における`nullptr`のようなもの）。

終了したスレッドを表す識別子の値は、再利用される可能性がある。


## 例
```cpp example
#include <iostream>
#include <thread>

int main()
{
  std::jthread {[]{
    const std::jthread::id background_tid = std::this_thread::get_id();
    std::cout << "background=" << background_tid << std::endl;
  }};

  const std::jthread::id main_tid = std::this_thread::get_id();
  std::cout << "main=" << main_tid << std::endl;
}
```
* std::jthread::id[color ff0000]
* std::this_thread::get_id()[link /reference/thread/this_thread/get_id.md]

### 出力例
```
background=140029246985984
main=140029246990144
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10.2.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??
