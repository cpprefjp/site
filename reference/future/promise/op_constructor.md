#コンストラクタ (C++11)
```cpp
promise();

template <class Allocator>
promise(allocator_arg_t, const Allocator& a);

promise(promise&& rhs) noexcept;
promise(const promise& rhs) = delete;
```
* allocator_arg_t[link /reference/memory/allocator_arg_t.md]

##promiseオブジェクトの構築
- `promise();`<br/>デフォルトコンストラクタ。`promise`オブジェクトと共有状態の構築を行う。
- `template <class Allocator>`<br/>`promise(allocator_arg_t, const Allocator& a);`<br/>アロケータを指定して`promise`オブジェクトと共有状態の構築を行う。
- `promise(promise&& rhs) noexcept;`<br/>ムーブコンストラクタ。新たな`promise`オブジェクトを構築し、`rhs`から共有状態の所有権を移譲する。<br/>事後条件： `rhs`が共有状態を持っていないこと
- `promise(const promise& rhs) = delete;`<br/>コピーコンストラクタ。コピー禁止。


###例
```cpp
#include <memory>
#include <future>

int main()
{
  // デフォルト構築
  {
    std::promise<int> p;
  }

  // アロケータを指定して構築
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

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0


##参照


