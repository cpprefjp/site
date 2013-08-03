#left
```cpp
namespace std {
  ios_base& left(ios_base& str);
}
```

##概要
出力時に左揃えにすることを指示するマニピュレータ。
フィールド幅に揃えるための文字を右側に挿入するようになる。
`setw`と組み合わせることで効果がある。

##効果
`str.setf(ios_base::left, ios_base::adjustfield)`を実行する。

##戻り値
実引数のstrオブジェクト。

##例
```cpp
#include <iostream>
#include <iomanip>

int main()
{
  std::cout << '|' << std::left << std::setw(6) << -12 << '|' << std::endl;
  std::cout << '|' << std::internal << std::setw(6) << -12 << '|' << std::endl;
  std::cout << '|' << std::right << std::setw(6) << -12 << '|' << std::endl;
}
```

###出力
```
|-12   |
|-   12|
|   -12|
```

##バージョン
###言語
- C++03

##参照
- [`internal`](./internal.md)
- [`right`](./right.md)
