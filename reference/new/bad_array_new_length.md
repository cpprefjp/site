#bad_array_new_length
```cpp
namespace std {
  class bad_array_new_length : public bad_alloc {
  public:
    bad_array_new_length() noexcept;
  };
}
```
* bad_alloc[link /reference/new/bad_alloc.md]

##概要
動的に記憶域を確保しようとする配列の長さが 0 未満または処理系の最大値以上の場合に送出される例外。


##バージョン
C++11

