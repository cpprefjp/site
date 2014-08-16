#swap (C++11)
```cpp
void swap(weak_ptr& r) noexcept;
```

##概要
他の`weak_ptr`オブジェクトとデータを入れ替える。


##効果
`*this`と`r`の監視対象を入れ替える。


##戻り値
なし


##例外
投げない


##例
```cpp
#include <iostream>
#include <memory>

int main()
{
  std::shared_ptr<int> sp1(new int(1));
  std::weak_ptr<int> wp1 = sp1;

  std::shared_ptr<int> sp2(new int(2));
  std::weak_ptr<int> wp2 = sp2;

  // wp1とwp2を入れ替える
  wp1.swap(wp2);

  if (std::shared_ptr<int> r = wp1.lock()) {
	std::cout << *r << std::endl;
  }

  if (std::shared_ptr<int> r = wp2.lock()) {
	std::cout << *r << std::endl;
  }
}
```

###出力
```
2
1
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [Clang libc++, C++11 mode](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?
