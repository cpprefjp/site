#代入演算子(C++11)
```cpp
packaged_task& operator=(const packaged_task&) = delete;
packaged_task& operator=(packaged_task&& rhs) noexcept;
```

##概要
- `packaged_task& operator=(const packaged_task&) = delete;`<br/>コピー代入演算子。コピー不可。
- `packaged_task& operator=(packaged_task&& rhs) noexcept;`<br/>ムーブ代入演算子。`*this`の共有状態を解放し、`packaged_task(std::`[`move`](/reference/utility/move.md)`(rhs)).swap(*this)`を行う。<br/>戻り値： `*this`<br/>例外： 投げない


##例
```cpp
#include <future>

int foo() { return 3; }

int main()
{
  // ムーブ代入
  // 共有状態の所有権とタスクを移動する
  std::packaged_task<int()> task1(foo);
  std::packaged_task<int()> task2;

  task2 = std::move(task1);

  // task1は共有状態を持たない
}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): 11.0


##参照


