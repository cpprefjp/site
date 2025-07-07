# null_memory_resource
* memory_resource[meta header]
* std::pmr[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::pmr {
  memory_resource* null_memory_resource() noexcept;
}
```

## 概要
メモリの確保も解放も行わない`memory_resource`を取得する。

この関数によって取得された`memory_resource`は以下の特徴を持つ。

- [`allocate()`](memory_resource/allocate.md)の呼び出しは常に、[`bad_alloc`](/reference/new/bad_alloc.md)例外を投げる。
- [`deallocate()`](memory_resource/deallocate.md) の呼び出しは何も行わない。

## 戻り値
静的記憶域期間に配置されている`memory_resource`実装のオブジェクトへのポインタを返す。

呼び出し時は常に同じポインタを返す。

## 例外
投げない。

## 備考
この関数で取得したポインタを`p`、その他任意の`memory_resource`オブジェクトを`r`とすると、[`p->is_equal(r)`](memory_resource/is_equal.md)は`&r == p`を返す。

実装クラスの型名は未規定。

## 例
```cpp example
#include <iostream>
#include <memory_resource>

int main()
{
  auto* mr = std::pmr::null_memory_resource();
  std::pmr::polymorphic_allocator<int> alloc(mr);

  std::cout << mr << std::endl;
  std::cout << std::pmr::null_memory_resource() << std::endl;

  try {
    auto* p = mr->allocate(sizeof(int), alignof(int));
  }
  catch (const std::exception& except) {
    //必ずここを通る
    std::cout << except.what() << std::endl;
  }
}
```
* null_memory_resource[color ff0000]
* polymorphic_allocator[link polymorphic_allocator.md]

### 出力例（VS2019 Preview2）
```
00007FFCB3396270
00007FFCB3396270
bad allocation
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6 [mark verified]

## 関連項目
- [`memory_resource`](memory_resource.md)
