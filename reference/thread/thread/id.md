# id
* thread[meta header]
* std[meta namespace]
* thread[meta class]
* class[meta id-type]
* cpp11[meta cpp]

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
* hash[link /reference/functional/hash.md]

## 概要
スレッド識別子。trivially copyable class。

実行のスレッドに対して一意な`thread::id`が対応づけられる。デフォルトコンストラクトされた`thread::id`はいかなるスレッドとも対応付けられない（ポインタ型における`nullptr`のようなもの）。

終了したスレッドを表す識別子の値は、再利用される可能性がある。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|-----------------|------------------------------------------------------------------------|-------|
| `id() noexcept` | デフォルトコンストラクタ。いかなるスレッドも指さない識別子を生成する。 | C++11 |


## 比較演算子

| 名前 | 説明 | 対応バージョン |
|--------------|------------------------------------|-------|
| `operator==` | 等値比較                           | C++11 |
| `operator!=` | 非等値比較                         | C++11 |
| `operator<`  | 左辺が右辺より小さいかの判定を行う | C++11 |
| `operator<=` | 左辺が右辺以下かの判定を行う       | C++11 |
| `operator>`  | 左辺が右辺より大きいかの判定を行う | C++11 |
| `operator>=` | 左辺が右辺以上かの判定を行う       | C++11 |

### ストリーム出力

| 名前 | 説明 | 対応バージョン |
|--------------|-----------------------------------------------------------------------------------------------------|-------|
| `operator<<` | `thread::id`のストリーム出力。 フォーマットは未規定だが、他の識別子と異なることがわかる表現となる。 | C++11 |


## hashサポート

| 名前 | 説明 | 対応バージョン |
|--------|-----------------------------------------|-------|
| `hash` | `thread::id`での特殊化 (class template) | C++11 |


## 例
```cpp
#include <iostream>
#include <thread>

int main()
{
  const std::thread::id main_tid = std::this_thread::get_id();
  std::cout << "main=" << main_tid << std::endl;
  return 0;
}
```
* std::thread::id[color ff0000]

### 出力例
```
main=824a30
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc):
- [GCC, C++11 mode](/implementation.md#gcc):
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0, 14.0

## 参照
- [LWG Issue 783. `thread::id` reuse](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#783)

