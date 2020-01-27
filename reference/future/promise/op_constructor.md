# コンストラクタ
* future[meta header]
* std[meta namespace]
* promise[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
promise();                                    // (1)

template <class Allocator>
promise(allocator_arg_t, const Allocator& a); // (2)

promise(promise&& rhs) noexcept;              // (3)
promise(const promise& rhs) = delete;         // (4)
```
* allocator_arg_t[link /reference/memory/allocator_arg_t.md]

## promiseオブジェクトの構築
- (1) : デフォルトコンストラクタ。`promise`オブジェクトと共有状態の構築を行う。
- (2) : ア�ケータを指定して`promise`オブジェクトと共有状態の構築を行う。
- (3) : ムーブコンストラクタ。新たな`promise`オブジェクトを構築し、`rhs`から共有状態の所有権を移�する。
- (4) : コピーコンストラクタ。コピー禁�。


## 事後条件
- (3) : `rhs`が共有状態を持っていないこと


## 例
```cpp example
#include <memory>
#include <future>

int main()
{
  // デフォルト構築
  {
    std::promise<int> p;
  }

  // ア�ケータを指定して構築
  {
    std::promise<int> p = {
        std::allocator_arg,
        std::allocator<std::promise<int>>()
    };
  }

  // ムーブ構築
  {
    std::promise<int> p1;
    std::promise<int> p2 = std::move(p1);
  }
}
```
* std::allocator_arg[link /reference/memory/allocator_arg_t.md]
* std::allocator[link /reference/memory/allocator.md]
* std::move[link /reference/utility/move.md]

### 出力
```
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


