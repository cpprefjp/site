#bad_weak_ptr
```cpp
namespace std {
  class bad_weak_ptr : public exception;
}
```
* exception[link /reference/exception/exception.md]

##概要
`bad_weak_ptr`は、`weak_ptr`オブジェクトから破棄済みの`shared_ptr`オブジェクトを構築しようとした場合に発生する例外クラスである。破棄済みの`shared_ptr`を監視する`weak_ptr`オブジェクトから`weak_ptr::lock()`メンバ関数で`shared_ptr`オブジェクトを構築した場合、すでに`shared_ptr`が破棄されていれば、例外を送出することなく空の`shared_ptr`が返される。しかし、破棄済みの`shared_ptr`を監視する`weak_ptr`オブジェクトが`shared_ptr`のコンストラクタ引数として渡された場合には、この例外が送出される。

###メンバ関数

| | |
|--------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| `bad_weak_ptr() noexcept;`<br/>`bad_weak_ptr(const bad_weak_ptr&) noexcept;` | コンストラクタ |
| `virtual ~bad_weak_ptr() = default;` | デストラクタ |
| `bad_weak_ptr& operator=(const bad_weak_ptr&) noexcept;` | 代入演算子 |
| `virtual const char* what() const noexcept;` | エラー内容を取得する。文字列`"bad_weak_ptr"`が返される |

###例
```cpp
#include <memory>
#include <iostream>
 
int main() {
  auto sp = std::make_shared<int>(42);
  std::weak_ptr<int> wp(sp);
 
  sp.reset();
  try {
    std::shared_ptr<int> i(wp);
  } catch(std::exception const& e) {
    std::cout << e.what() << std::endl;
  }
}
```

###出力(GCC 4.7での出力。規格上は"bad_weak_ptr"と出力されるのが正しい)
```
std::bad_weak_ptr
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.4, 4.7.2(`what()`が`"std::bad_weak_ptr"`を返すので規格違反。バグ報告済み。[#55847](http://gcc.gnu.org/bugzilla/show_bug.cgi?id=55847))
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) 10.0

###参照

