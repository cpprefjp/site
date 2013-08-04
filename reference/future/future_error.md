#future_error(C++11)
```cpp
namespace std {
  class future_error : public logic_error;
}
```
* logic_error[link /reference/stdexcept.md]

##概要
`future_error`は、[`future`](./future.md)/[`promise`](./promise.md)操作でのエラーを扱うための例外クラスである。


###メンバ関数

| | |
|----------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `future_error(`[`error_code`](/reference/system_error/error_code.md)` ec);` | [`error_code`](/reference/system_error/error_code.md)オブジェクトから`future_error`オブジェクトを生成する。<br/>注：このクラスは標準ライブラリの内部で送出される例外クラスで、ユーザーが使用するものではないため、コンストラクタは説明のためにのみ記載されている。 |
| `const `[`error_code`](/reference/system_error/error_code.md)`& code() const noexcept;` | 包含している[`error_code`](/reference/system_error/error_code.md)オブジェクトへの参照を取得する |
| `virtual const char* what() const noexcept;` | エラー理由となる実装依存文字列(`code.`[`message`](/reference/system_error/error_code/message.md)`()`)を返す |

###例
```cpp
#include <iostream>
#include <future>
#include <thread>
#include <utility>

void foo(std::promise<int> p)
{
  p.set_value(3);

  try {
    p.set_value(1); // promiseに2回以上書き込むとエラー
  }
  catch (std::future_error& e) {
    std::cout << "value:" << e.code().value() << std::endl;
    std::cout << "what:" << e.what() << std::endl;
  }
}

int main()
{
  std::promise<int> p;
  std::future<int> f = p.get_future();

  std::thread t(foo, std::move(p));

  std::cout << f.get() << std::endl;

  t.join();
}
```

###出力例
```
3
value:3
what:Promise already satisfied
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


###参照


