#thread::id
```cpp
namespace std {
  class thread::id {
  public:
    id() noexcept;
  };

  bool operator==(thread::id x, thread::id y) noexcept;
  bool operator!=(thread::id x, thread::id y) noexcept;
  bool operator<(thread::id x, thread::id y) noexcept;
  bool operator<=(thread::id x, thread::id y) noexcept;
  bool operator>(thread::id x, thread::id y) noexcept;
  bool operator>=(thread::id x, thread::id y) noexcept;

  template<class charT, class traits>
  basic_ostream<charT, traits>& operator<<(basic_ostream<charT, traits>& out, thread::id id);

  template <class T> struct hash;
  template <> struct hash<thread::id>;
}
```

##概要
スレッド識別子。trivially copyable class。

実行のスレッドに対して一意な`thread::id`が対応づけられる。デフォルトコンストラクトされた`thread::id`はいかなるスレッドとも対応付けられない（ポインタ型における`nullptr`のようなもの）。


###メンバ関数

| | |
|----------------------------|-------------------------------------------------------------------------------------------------------------|
| `id() noexcept` | デフォルトコンストラクタ。 いかなるスレッドも指さない識別子を生成する。 |


###比較演算子

| | |
|-------------------------|-----------------------------------------------------|
| `operator==` | 等値比較 |
| `operator!=` | 非等値比較 |
| `operator<` | 左辺が右辺より小さいかの判定を行う |
| `operator<=` | 左辺が右辺以下かの判定を行う |
| `operator>` | 左辺が右辺より大きいかの判定を行う |
| `operator>=` | 左辺が右辺以上かの判定を行う |

###ストリーム出力

| | |
|-------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `operator<<` | `thread::id`のストリーム出力。 フォーマットは未規定だが、他の識別子と異なることがわかる表現となる。 |


###hashサポート

| | |
|-------------------|---------------------------------------------------------|
| `hash` | `thread::id`での特殊化 (class template) |


##例
```cpp
#include <iostream>
#include <thread>

int main()
{
  std::cout << "main=" << std::this_thread::get_id() << std::endl;
  return 0;
}
```

###出力例
```
main=824a30
```

##バージョン
###言語
- C++11:

###参照


