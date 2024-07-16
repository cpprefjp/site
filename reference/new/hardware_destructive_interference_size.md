# hardware_destructive_interference_size
* new[meta header]
* std[meta namespace]
* variable[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  inline constexpr std::size_t hardware_destructive_interference_size = implementation-defined;
}
```

## 概要
2つのオブジェクトに並行アクセスする際に、パフォーマンス低下を避けられる最小アライメントサイズ。

```cpp
struct keep_apart {
  std::atomic<int> cat;
  std::atomic<int> dog;
};
```

このような構造体がある場合、`cat`と`dog`が同じキャッシュラインに乗ることがある。スレッド1では`cat`変数、スレッド2では`dog`変数を操作するような状況で、それぞれが共通のキャッシュを無効化してしまうパフォーマンス劣化の問題が起こりえる。こういった状況を「false sharing」という。

`hardware_destructive_interference_size`は、false sharingを回避するための、変数ごとにキャッシュラインを分けられる最小アライメントサイズである。

```cpp
struct keep_apart {
  alignas(std::hardware_destructive_interference_size) std::atomic<int> cat;
  alignas(std::hardware_destructive_interference_size) std::atomic<int> dog;
};
```
* std::hardware_destructive_interference_size[color ff0000]


## 備考
- この変数の値は、`alignof(`[`max_align_t`](/reference/cstddef/max_align_t.md)`)`以上である
- 実装上、`hardware_constructive_interference_size`と`hardware_destructive_interference_size`は同値になるはずだが、利用目的によって名前を使い分けるために分かれている


## 例
```cpp
#include <iostream>
#include <new>
#include <thread>
#include <vector>

struct X {
  alignas(std::hardware_destructive_interference_size) int a;
  alignas(std::hardware_destructive_interference_size) int b;
};

struct IndividualCacheInt {
  alignas(std::hardware_destructive_interference_size) int value;
};

int main()
{
  std::cout << "hardware_destructive_interference_size : "
            << std::hardware_destructive_interference_size
            << std::endl;

  // 構造体内のメンバ変数aとbを、それぞれ別なキャッシュラインに乗せる
  {
    X x;
    x.a = 0;
    x.b = 0;
    std::thread t1{[&x]{
      for (int i = 0; i < 100; ++i) {
        ++x.a;
      }
    }};

    std::thread t2{[&x]{
      for (int i = 0; i < 100; ++i) {
        ++x.b;
      }
    }};

    t1.join();
    t2.join();
  }

  // 連続したメモリの各要素を、個別のキャッシュに乗せる
  {
    std::vector<IndividualCacheInt> v{10};
    std::vector<std::thread> threads;
    for (std::size_t i = 0; i < v.size(); ++i) {
      threads.push_back(std::thread{[&v, i]{
        for (int j = 0; j < 100; ++j) {
          ++v[i].value;
        }
      }});
    }

    for (std::thread& t : threads) {
      t.join();
    }
  }
}
```
* std::hardware_destructive_interference_size[color ff0000]
* threads.push_back[link /reference/vector/vector/push_back.md]


### 出力例
```
hardware_destructive_interference_size : 64
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 12.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp):


## 参照
- [N4523 `constexpr std::thread::hardware_{true,false}_sharing_size`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4523.html)
- [P0154R0 `constexpr std::hardware_{constructive,destructive}_interference_size`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0154r0.html)
- [P0154R1 `constexpr std::hardware_{constructive,destructive}_interference_size`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0154r1.html)
- [今さら聞けないマルチプロセッサの基礎教えます　――キャッシュの共有，割り込みの共有，OSによる制御 - ページ11 キャッシュの利用にも注意が必要](http://www.kumikomi.net/archives/2005/02/02multi.php?page=11)
- [false sharingの整理 - yoskhdia’s diary](http://yoskhdia.hatenablog.com/entry/2016/06/03/191329)
- [Understanding `std::hardware_destructive_interference_size` and `std::hardware_constructive_interference_size` - Stack Overflow](https://stackoverflow.com/questions/39680206/understanding-stdhardware-destructive-interference-size-and-stdhardware-cons)
    - 設計についての作者JF Bastien氏からのコメントがある
    - WebAssemblyなどの仮想環境ではターゲットアーキテクチャが実行時に決まるため、実行時の値もあるとよいだろう、とのコメントもある
- [[RFC] C++17 hardware constructive / destructive interference size - Clang Developers Mailing list](https://lists.llvm.org/pipermail/cfe-dev/2018-May/058073.html)
