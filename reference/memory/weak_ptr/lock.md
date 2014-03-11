#lock(C++11)
```cpp
shared_ptr<T> lock() const noexcept;
```
* shared_ptr[link /reference/memory/shared_ptr.md]

##概要
監視している[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトを取得する。


##戻り値
```cpp
expired() ? shared_ptr<T>() : shared_ptr<T>(*this)
```
* expired()[link ./expired.md]
* shared_ptr[link /reference/memory/shared_ptr.md]

監視している[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトが有効な状態なら、その[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトとリソースを共有する[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトを作って返す。これによって、ロックしている間、[`shared_ptr`](/reference/memory/shared_ptr)オブジェクトの寿命が尽きないようにする。

監視している[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトが寿命切れ状態なら、空の[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトを作って返す。


##例外
投げない


##例
```cpp
#include <iostream>
#include <memory>

int main()
{
  std::shared_ptr<int> sp(new int(3));
  std::weak_ptr<int> wp = sp;

  // …この間に、spの寿命が切れるかもしれない…

  // wpが監視しているshared_ptrオブジェクトの
  // 寿命が切れていなければ処理する
  if (std::shared_ptr<int> r = wp.lock()) {
	std::cout << *r << std::endl;
  }
  else {
	// shared_ptrオブジェクトの寿命が切れている
	std::cout << "sp is expired" << std::endl;
  }
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
- [GCC, C++11 mode](/implementation#gcc.md): 4.3.6
- [Clang libc++, C++11 mode](/implementation#clang.md): 3.0
- [ICC](/implementation#icc.md): ?
- [Visual C++](/implementation#visual_cpp.md): ?
