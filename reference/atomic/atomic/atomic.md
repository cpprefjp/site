#コンストラクタ
```cpp
atomic() noexcept = default;
constexpr atomic(T desired) noexcept;

atomic(const atomic&) = delete;
```

##atomicオブジェクトの構築
- `atomic() noexcept`<br/>デフォルトコンストラクタ。`atomic`オブジェクトを未初期化状態にする(C言語との互換性のため)
- `constexpr atomic(T desired)`<br/>`desired`でオブジェクトを初期化する。この初期化はアトミック操作ではない。


##例外
投げない


##例
```cpp
#include <iostream>
#include <atomic>

int main()
{
  // デフォルト構築(不定値)
  std::atomic<int> a;

  // 値を指定して初期化
  std::atomic<int> b(3);

  std::cout << b.load() << std::endl;
}
```


###出力
```
3
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


