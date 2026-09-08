# stack_size_hint
* thread[meta header]
* std[meta namespace]
* thread[meta class]
* class[meta id-type]
* cpp29[meta cpp]

```cpp
class thread::stack_size_hint {
public:
  constexpr explicit stack_size_hint(size_t s) noexcept; // (1) C++29
};
```

## 概要
生成するスレッドのスタックサイズを設定するための、スレッド属性 (thread attribute) クラス。

[`thread`](../thread.md)または[`jthread`](../jthread.md)のコンストラクタで、関数オブジェクトより前の引数として渡すことで、スレッドが必要とするプラットフォーム固有の記憶域（主に自動記憶域期間の変数に使われる、いわゆるスタック）の望ましいサイズをバイト数で指定する。

```cpp
std::jthread t{std::thread::stack_size_hint(512 * 1024), f, 42};
```

これはあくまでヒントであり、実装はプラットフォーム固有の要件を満たすために、設定するスタックサイズを上下に調整してよく、要求を無視することもできる。

- (1) : スタックサイズのヒント値`s`（バイト数）を保持して構築する

`jthread`では、別名`jthread::stack_size_hint`としても使用できる。


## 備考
- 指定した値が`0`である場合、この属性は無視される
- デフォルトのスタックサイズはプラットフォームによって異なる（Windowsでは通常1MB、多くのUnix系では2MBなど）。大量のスレッドを起動するアプリケーションでの使用量の削減や、深い再帰・大きな自動変数を使うアプリケーションでの拡大、プラットフォーム間で一貫したサイズの確保などに使用できる
- 要求したスタックサイズを満たせない場合に、実装が例外を投げることは許可されるが、要求はされない


## 例
```cpp
#include <thread>
#include <iostream>

void work()
{
  std::cout << "work" << std::endl;
}

int main()
{
  // スタックサイズ512KiBのヒントを指定してスレッドを生成する
  std::jthread t{std::thread::stack_size_hint(512 * 1024), work};
}
```
* std::thread::stack_size_hint[color ff0000]

このコードはC++29の規則のもとでは適格だが、2026年9月時点でスレッド属性を実装した処理系はない。

### 出力
```
work
```


## バージョン
### 言語
- C++29

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`name_hint`](name_hint.md)
- [`thread`のコンストラクタ](op_constructor.md)
- [`jthread`のコンストラクタ](../jthread/op_constructor.md)


## 参照
- [P2019R9 Thread attributes](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p2019r9.pdf)
