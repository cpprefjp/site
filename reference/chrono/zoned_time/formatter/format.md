# format
* chrono[meta header]
* std[meta namespace]
* formatter[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
template <class FormatContext>
typename FormatContext::iterator
format(const chrono::zoned_time<Duration, TimeZonePtr>& tp,
       FormatContext& ctx);                                 // (1) C++20
```

## 概要
`zoned_time`クラスオブジェクトを文字列フォーマットする。


## 効果
以下と等価：

```cpp
sys_info info = tp.get_info();
chrono::local-time-format-t<Duration> x {
  tp.get_local_time(),
  &info.abbrev,
  &info.offset
};

return formatter<chrono::local-time-format-t<Duration>, charT>::format(
    x,
    ctx
);
```
* sys_info[link /reference/chrono/sys_info.md]
* chrono::local-time-format-t[link /reference/chrono/local-time-format-t.md]
* tp.get_info()[link /reference/chrono/zoned_time/get_info.md]
* tp.get_local_time()[link /reference/chrono/zoned_time/get_local_time.md]

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
